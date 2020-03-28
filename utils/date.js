export const createDateString = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }

  return new Date(date).toLocaleString('de-DE', options)
}
