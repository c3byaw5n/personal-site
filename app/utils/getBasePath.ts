export const getBasePath = (path?: string): string => {
  if (!path || path === '/') return '/'
  return `/${path.split('/')[1]}`
}
