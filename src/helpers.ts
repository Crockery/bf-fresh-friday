

export const daysSince = (utcNum: number): number => {
  const oneDay = 1000 * 60 * 60 * 24 
  const today = new Date()
  const compareDate = new Date(0)
  compareDate.setUTCSeconds(utcNum)
  return Number((Math.round((today.getTime() - compareDate.getTime()) / oneDay)).toFixed())
}
