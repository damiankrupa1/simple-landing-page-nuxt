export const validateStringArray = (value: unknown) => {
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    return 'Enter a JSON array containing only text values.'
  }

  return true
}

/**
 * Size guide rows: every row needs a size and exactly one value per column. `columnCount` comes from the
 * sibling `columns` array; while it is unknown (nothing to compare with) only the row shape is checked.
 */
export const validateSizeGuideRows = (rows: unknown, columnCount: number | undefined) => {
  if (!Array.isArray(rows)) return true

  for (const [index, row] of rows.entries()) {
    const values = (row as { values?: unknown } | null)?.values
    if (!Array.isArray(values)) continue // the `values` field reports its own shape errors
    if (columnCount !== undefined && values.length !== columnCount) {
      return `Row ${index + 1} has ${values.length} value(s) but the table has ${columnCount} column(s).`
    }
  }

  return true
}

/** Anchor of an information page section: it is the `id` of the heading, so a letter first, then letters, digits, `-`. */
export const validateAnchor = (value: unknown) =>
  typeof value === 'string' && /^[A-Za-z][A-Za-z0-9-]*$/.test(value)
    ? true
    : 'Use letters, digits and "-", starting with a letter (for example "delivery").'

/** A link to another page of the store: a path relative to the country (`/store`, `/#studio-story`), never an external URL. */
export const validateStorePath = (value: unknown) =>
  typeof value === 'string' && /^\/(?!\/)\S*$/.test(value)
    ? true
    : 'Enter a path inside the store that starts with "/" (for example /store).'

/** Section anchors must be unique on a page, or two headings would share an `id` and the table of contents breaks. */
export const validateUniqueAnchors = (sections: unknown) => {
  if (!Array.isArray(sections)) return true

  const seen = new Set<string>()
  for (const section of sections) {
    const anchor = (section as { anchor?: unknown } | null)?.anchor
    if (typeof anchor !== 'string' || anchor === '') continue // the `anchor` field reports its own errors
    if (seen.has(anchor)) return `Two sections use the anchor "${anchor}". Anchors must be unique on a page.`
    seen.add(anchor)
  }

  return true
}
