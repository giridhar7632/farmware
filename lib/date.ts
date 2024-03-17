export function addDays(date: Date, days: number) {
  const result = new Date(date)
  // subtract 7 months form the date
  result.setMonth(result.getMonth() - 7)
  result.setDate(result.getDate() + days)
  return result
}

export function isDateInFuture(date: Date) {
  const today = new Date()
  const givenDate = new Date(date)
  givenDate.setDate(givenDate.getDate() + 5)

  return givenDate > today
}
