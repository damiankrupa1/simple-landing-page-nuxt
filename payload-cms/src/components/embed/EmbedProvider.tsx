'use client'

import { usePathname, useRouter } from 'next/navigation.js'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { EMBED_HIDE_CSS, isFramed, screenForPath, type EmbedScreen } from '../../embed/frame.ts'
import {
  buildMessage,
  isTrustedEvent,
  parseHostMessage,
  type FrameMessage,
  type HostTheme,
} from '../../embed/protocol.ts'

type Props = {
  children?: React.ReactNode
  /** PAYLOAD_EMBEDDED, read on the server at request time (no rebuild needed to change it). */
  embedded: boolean
  /** Allowed Medusa admin origins (MEDUSA_ADMIN_URLS / MEDUSA_ADMIN_URL). */
  origins: string[]
}

type Mode = 'unknown' | 'frame' | 'direct'

const TEXTS = {
  en: {
    renew: 'Renewing your session...',
    denied: 'You have no access to the CMS. Ask an administrator for a role.',
    managedAccount: 'Your account details are managed by the Medusa admin.',
  },
  pl: {
    renew: 'Odnawianie sesji...',
    denied: 'Brak dostępu do CMS. Poproś administratora o rolę.',
    managedAccount: 'Dane konta są zarządzane przez panel Medusy.',
  },
}

/**
 * Wraps the whole admin.
 *
 * Embed mode (flag on): account, logout and language controls are hidden until the page proves it is not framed,
 * so a direct visit to /admin behaves as before. In a frame the host controls locale and appearance, and account
 * identity remains read-only because it is owned by Medusa.
 */
export const EmbedProvider: React.FC<Props> = ({ children, embedded, origins }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('unknown')
  const hostOrigin = useRef<string | null>(null)

  const applyHostTheme = useCallback((theme: HostTheme) => {
    const root = document.documentElement
    root.style.setProperty('--payload-host-background', theme.backgroundColor)
    root.style.setProperty('--theme-bg', theme.backgroundColor)
    root.dataset.theme = theme.colorScheme
  }, [])

  const applyHostLocale = useCallback((lng: 'en' | 'pl') => {
    document.cookie = `payload-lng=${lng}; Path=/; Max-Age=31536000; SameSite=${
      window.location.protocol === 'https:' ? 'None; Secure' : 'Lax'
    }`
    router.refresh()
  }, [router])

  useEffect(() => {
    if (!embedded) return
    const next = isFramed(window) ? 'frame' : 'direct'
    document.documentElement.dataset.embed = next
    setMode(next)
  }, [embedded])

  /** Sends to the host origin once known (after `hello`), otherwise to every allowed origin (browsers drop the rest). */
  const post = useCallback(
    (message: FrameMessage) => {
      const envelope = buildMessage(message)
      for (const target of hostOrigin.current ? [hostOrigin.current] : origins) {
        window.parent.postMessage(envelope, target)
      }
    },
    [origins],
  )

  const reportExpired = useCallback(
    () => post({ type: 'session:expired', payload: { reason: 'expired' } }),
    [post],
  )

  useEffect(() => {
    if (mode !== 'frame') return

    const logoutWhenFrameCloses = () => {
      void fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'same-origin',
        keepalive: true,
      }).catch(() => undefined)
    }

    window.addEventListener('pagehide', logoutWhenFrameCloses)
    return () => window.removeEventListener('pagehide', logoutWhenFrameCloses)
  }, [mode])

  // Host -> frame commands.
  useEffect(() => {
    if (mode !== 'frame') return
    const onMessage = (event: MessageEvent) => {
      if (!isTrustedEvent(event, origins, window.parent)) return
      const message = parseHostMessage(event.data)
      if (!message) return
      hostOrigin.current = event.origin
      switch (message.type) {
        case 'hello':
          applyHostLocale(message.payload.lng)
          if (message.payload.theme) applyHostTheme(message.payload.theme)
          break
        case 'nav:goto':
          router.push(message.payload.path)
          break
        case 'locale:changed':
          applyHostLocale(message.payload.lng)
          break
        case 'theme:changed':
          applyHostTheme(message.payload)
          break
        case 'session:logout':
          void fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'same-origin',
            keepalive: true,
          })
            .catch(() => undefined)
            .then(() => router.replace('/admin/login'))
          break
        case 'session:keepalive':
          void fetch('/api/users/refresh-token', { method: 'POST', credentials: 'same-origin' })
            .then((response) => {
              if (!response.ok) reportExpired()
            })
            .catch(() => undefined)
          break
      }
    }
    window.addEventListener('message', onMessage)
    // Announce ourselves; the host answers with `hello`, which tells us its exact origin.
    post({ type: 'ready', payload: { path: window.location.pathname, locale: document.documentElement.lang || 'en' } })
    return () => window.removeEventListener('message', onMessage)
  }, [applyHostLocale, applyHostTheme, mode, origins, post, reportExpired, router])

  // Frame -> host: navigation and session state, on every admin route change.
  const screen: EmbedScreen | null = mode === 'frame' ? screenForPath(pathname) : null
  useEffect(() => {
    if (mode !== 'frame') return
    const path = window.location.pathname
    if (screen?.kind === 'renew') post({ type: 'session:expired', payload: { reason: screen.reason } })
    else if (screen?.kind === 'denied') post({ type: 'access:denied', payload: { path } })
    else post({ type: 'nav:changed', payload: { path, search: window.location.search } })
  }, [mode, pathname, screen?.kind, post]) // eslint-disable-line react-hooks/exhaustive-deps

  const texts = (typeof document !== 'undefined' ? document.documentElement.lang : '').startsWith('pl')
    ? TEXTS.pl
    : TEXTS.en

  return (
    <>
      {embedded ? <style>{EMBED_HIDE_CSS}</style> : null}
      {children}
      {screen ? (
        <div
          role="status"
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            textAlign: 'center',
            background: 'var(--theme-bg, #fff)',
            color: 'var(--theme-text, #111)',
            zIndex: 2147483000,
          }}
        >
          {screen.kind === 'denied'
            ? texts.denied
            : screen.kind === 'managed-account'
              ? texts.managedAccount
              : texts.renew}
        </div>
      ) : null}
    </>
  )
}
