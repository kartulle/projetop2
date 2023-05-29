export function getFormatedMinutes(minutes: number) {
  minutes = Math.floor(minutes)

  if (minutes <= 60) {
    return `${minutes} min`
  }

  const hours = String(Math.floor(minutes / 60))
  const remainingMinutes = String(minutes % 60)

  return `${hours.padStart(2, '0')}:${remainingMinutes.padStart(2, '0')}`
}
