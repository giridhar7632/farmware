export function addDays(date: string, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result.toISOString()
}

export function isDateInFuture(date: string) {
  const today = new Date()
  const givenDate = new Date(date)
  givenDate.setDate(givenDate.getDate() + 5)

  return givenDate > today
}
