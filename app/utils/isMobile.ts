export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  return /Mobi|Android|iPhone/i.test(navigator.userAgent)
}
