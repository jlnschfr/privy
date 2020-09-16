export const createDateString = (date, options) => {
  const isValid = Date.parse(date)
  return !isNaN(isValid) ? new Date(date).toLocaleString('de-DE', options) : ''
}
