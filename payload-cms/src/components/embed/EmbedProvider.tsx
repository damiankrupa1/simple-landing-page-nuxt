'use client'

import { usePathname, useRouter } from 'next/navigation.js'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { EMBED_HIDE_CSS, isFramed, screenForPath, type EmbedScreen } from '../../embed/frame.ts'
import { isDebugRequested } from '../../embed/gate.ts'
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

// `blocked`: not framed and no `enableDebug=1`; the middleware refuses such a load, this covers a browser that
// sends no `Sec-Fetch-Dest`.
type Mode = 'unknown' | 'frame' | 'direct' | 'blocked'

const TEXTS = {
  en: {
    renew: 'Renewing your session...',
    denied: 'You have no access to the CMS. Ask an administrator for a role.',
    managedAccount: 'Your account details are managed by the Medusa admin.',
    standalone: 'The CMS opens inside the Medusa admin.',
  },
  pl: {
    renew: 'Odnawianie sesji...',
    denied: 'Brak dostępu do CMS. Poproś administratora o rolę.',
    managedAccount: 'Dane konta są zarządzane przez panel Medusy.',
    standalone: 'CMS otwiera się w panelu Medusy.',
  },
}

/**
 * Wraps the whole admin.
 *
 * Embed mode (flag on): account, logout, language and dashboard controls are hidden unless the page is opened
 * standalone with `enableDebug=1` (then it behaves as without the flag). A standalone load without it is refused
 * by the middleware and covered here by a message. In a frame the host controls the language (admin UI and the
 * content locale, there is no dropdown) and appearance, and account identity remains read-only because it is
 * owned by Medusa.
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

  const applyHostLocale = useCallback(
    async (lng: 'en' | 'pl') => {
      document.cookie = `payload-lng=${lng}; Path=/; Max-Age=31536000; SameSite=${
        window.location.protocol === 'https:' ? 'None; Secure' : 'Lax'
      }`
      // The content locale dropdown is hidden in a frame, so the content language follows the host's: Payload
      // reads it from the `locale` preference, unless the URL carries its own `?locale=`.
      await fetch('/api/payload-preferences/locale', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: lng }),
      }).catch(() => undefined)
      const url = new URL(window.location.href)
      if (url.searchParams.has('locale')) {
        url.searchParams.set('locale', lng)
        router.replace(`${url.pathname}${url.search}`)
      } else {
        router.refresh()
      }
    },
    [router],
  )

  useEffect(() => {
    if (!embedded) return
    const next: Mode = isFramed(window)
      ? 'frame'
      : isDebugRequested(window.location.search, document.cookie)
        ? 'direct'
        : 'blocked'
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
          void applyHostLocale(message.payload.lng)
          if (message.payload.theme) applyHostTheme(message.payload.theme)
          break
        case 'nav:goto':
          router.push(message.payload.path)
          break
        case 'locale:changed':
          void applyHostLocale(message.payload.lng)
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
  const blocked = mode === 'blocked'
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
      {screen || blocked ? (
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
          {blocked
            ? texts.standalone
            : screen?.kind === 'denied'
              ? texts.denied
              : screen?.kind === 'managed-account'
                ? texts.managedAccount
                : texts.renew}
        </div>
      ) : null}
    </>
  )
}
