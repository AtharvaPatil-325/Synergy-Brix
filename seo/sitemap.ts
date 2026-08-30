import { resolveSiteUrl, SITE_URL } from './siteUrl.ts'

export type SitemapChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export type SitemapEntry = {
  path: string
  changeFrequency: SitemapChangeFrequency
  priority: number
}

/**
 * Public indexable routes that exist in src/App.tsx.
 * Keep slugs in sync with services, caseStudies, and blogPosts in src/data/siteData.ts.
 */
const staticEntries: SitemapEntry[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/solutions', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/work', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/industries', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/process', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/technologies', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/insights', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
]

const serviceSlugs = [
  'custom-software-development',
  'web-development',
  'business-automation',
  'dashboard-development',
  'saas-development',
  'cloud-solutions',
  'database-solutions',
] as const

const workSlugs = ['operations-visibility-platform', 'process-automation-suite'] as const

const insightSlugs = [
  'building-technology-around-business-processes',
  'what-makes-an-api-reliable',
  'when-dashboards-drive-better-decisions',
] as const

export function getSitemapEntries(): SitemapEntry[] {
  const dynamicEntries: SitemapEntry[] = [
    ...serviceSlugs.map((slug) => ({
      path: `/services/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...workSlugs.map((slug) => ({
      path: `/work/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...insightSlugs.map((slug) => ({
      path: `/insights/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  const seen = new Set<string>()
  return [...staticEntries, ...dynamicEntries].filter((entry) => {
    if (seen.has(entry.path)) return false
    seen.add(entry.path)
    return true
  })
}

export function getSitemapBaseUrl(): string {
  return resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VITE_SITE_URL ?? SITE_URL)
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export function buildSitemapXml(lastModified = new Date()): string {
  const baseUrl = getSitemapBaseUrl()
  const lastmod = lastModified.toISOString()
  const urls = getSitemapEntries()
    .map((entry) => {
      const loc = entry.path === '/' ? `${baseUrl}/` : `${baseUrl}${entry.path}`
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export function buildRobotsTxt(): string {
  const baseUrl = getSitemapBaseUrl()
  return `User-agent: *
Allow: /

Disallow: /404

Sitemap: ${baseUrl}/sitemap.xml
`
}
