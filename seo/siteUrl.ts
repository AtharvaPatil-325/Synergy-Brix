/** Canonical production origin. Never use localhost, www, or preview hosts. */
export const SITE_URL = 'https://synergybrix.com'

const PREVIEW_OR_LOCAL = /localhost|127\.0\.0\.1|\.vercel\.app|^www\.synergybrix\.com$/i

export function resolveSiteUrl(raw: string | undefined): string {
  const value = raw?.trim().replace(/\/$/, '') ?? ''
  if (!value) return SITE_URL

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return SITE_URL
    if (PREVIEW_OR_LOCAL.test(url.hostname)) return SITE_URL
    return `${url.protocol}//${url.host}`
  } catch {
    return SITE_URL
  }
}

export function absoluteUrl(path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (normalized === '/') return `${SITE_URL}/`
  return `${SITE_URL}${normalized.replace(/\/$/, '')}`
}
