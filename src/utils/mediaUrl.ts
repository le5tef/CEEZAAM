export function buildMediaUrl(path: string) {
  return `${import.meta.env.VITE_MEDIA_BASE}${path}`
}
