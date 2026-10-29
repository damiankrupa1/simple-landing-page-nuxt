'use client'

import React, { useEffect } from 'react'

import { EMBED_HIDE_CSS, isFramed } from '../../embed/frame.ts'

type Props = {
  children?: React.ReactNode
  /** PAYLOAD_EMBEDDED, read on the server at request time (no rebuild needed to change it). */
  embedded: boolean
  /** Allowed Medusa admin origins (MEDUSA_ADMIN_URLS / MEDUSA_ADMIN_URL). */
  origins: string[]
}

/**
 * Wraps the whole admin. In embed mode the account and logout UI is hidden (server-rendered CSS) until the
 * page proves it is not in a frame, so opening /admin directly keeps working exactly as before.
 */
export const EmbedProvider: React.FC<Props> = ({ children, embedded }) => {
  useEffect(() => {
    if (!embedded) return
    document.documentElement.dataset.embed = isFramed(window) ? 'frame' : 'direct'
  }, [embedded])

  return (
    <>
      {embedded ? <style>{EMBED_HIDE_CSS}</style> : null}
      {children}
    </>
  )
}
