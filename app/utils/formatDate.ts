const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export const formatDate = (dateString?: string): string => {
  if (!dateString) return ''
  return dateFormatter.format(new Date(dateString)).replace(/\//g, '.')
}
