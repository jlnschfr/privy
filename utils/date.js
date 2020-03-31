export const createDateString = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }

  const isValid = Date.parse(date)
  return !isNaN(isValid) ? new Date(date).toLocaleString('de-DE', options) : ''
}
