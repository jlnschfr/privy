export const createDateString = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }

  const isValid = Date.parse(date)
  return !isNaN(isValid) ? new Date(date).toLocaleString('de-DE', options) : ''
}
