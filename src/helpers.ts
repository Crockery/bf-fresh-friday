

export const daysSince = (utcNum: number): number => {
  const oneDay = 1000 * 60 * 60 * 24 
  const today = new Date()
  const compareDate = new Date(0)
  compareDate.setUTCSeconds(utcNum)
  return Number((Math.round((today.getTime() - compareDate.getTime()) / oneDay)).toFixed())
}

export const formatTitle = (title: string): string => {
  let newTitle = title
  if (title.includes('[FRESH]')) newTitle = title.replace('[FRESH]', '')
  if (title.includes('[FRESH ALBUM]')) newTitle = title.replace('[FRESH ALBUM]', '')
  if (title.includes('[FRESH VIDEO]')) newTitle = title.replace('[FRESH VIDEO]', '')
  if (title.includes('[Fresh]')) newTitle = title.replace('[Fresh]', '')
  if (title.includes('[Fresh Album]')) newTitle = title.replace('[Fresh Album]', '')
  if (title.includes('[Fresh Video]')) newTitle = title.replace('[Fresh Video]', '')
  return newTitle.trim()
}
