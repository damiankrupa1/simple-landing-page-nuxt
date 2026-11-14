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
