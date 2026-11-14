import type { GlobalConfig } from 'payload'

/**
 * Drafts for the storefront Globals. Autosave stays off: every autosave would reload the storefront preview,
 * and "Save draft" is predictable. `validate: false` (default) lets a draft miss required fields; publishing
 * still validates. `max` keeps the history short (globals use `max`, not `maxPerDoc`).
 */
export const globalVersions: NonNullable<GlobalConfig['versions']> = { drafts: true, max: 30 }
