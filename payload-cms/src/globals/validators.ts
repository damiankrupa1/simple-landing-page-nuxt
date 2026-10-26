export const validateStringArray = (value: unknown) => {
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    return 'Enter a JSON array containing only text values.'
  }

  return true
}
