import { useEffect } from 'react'

export function usePageMeta({ title, description, canonical }: { title: string; description: string; canonical: string }) {
  useEffect(() => {
    document.title = title

    const metaDescription = document.querySelector('meta[name="description"]') ?? document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    metaDescription.setAttribute('content', description)
    if (!metaDescription.parentNode) document.head.appendChild(metaDescription)

    const canonicalTag = document.querySelector('link[rel="canonical"]') ?? document.createElement('link')
    canonicalTag.setAttribute('rel', 'canonical')
    canonicalTag.setAttribute('href', canonical)
    if (!canonicalTag.parentNode) document.head.appendChild(canonicalTag)

    const ogTitle = document.querySelector('meta[property="og:title"]') ?? document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    ogTitle.setAttribute('content', title)
    if (!ogTitle.parentNode) document.head.appendChild(ogTitle)

    const ogDescription = document.querySelector('meta[property="og:description"]') ?? document.createElement('meta')
    ogDescription.setAttribute('property', 'og:description')
    ogDescription.setAttribute('content', description)
    if (!ogDescription.parentNode) document.head.appendChild(ogDescription)

    const ogUrl = document.querySelector('meta[property="og:url"]') ?? document.createElement('meta')
    ogUrl.setAttribute('property', 'og:url')
    ogUrl.setAttribute('content', canonical)
    if (!ogUrl.parentNode) document.head.appendChild(ogUrl)

    const twitterTitle = document.querySelector('meta[name="twitter:title"]') ?? document.createElement('meta')
    twitterTitle.setAttribute('name', 'twitter:title')
    twitterTitle.setAttribute('content', title)
    if (!twitterTitle.parentNode) document.head.appendChild(twitterTitle)

    const twitterDescription = document.querySelector('meta[name="twitter:description"]') ?? document.createElement('meta')
    twitterDescription.setAttribute('name', 'twitter:description')
    twitterDescription.setAttribute('content', description)
    if (!twitterDescription.parentNode) document.head.appendChild(twitterDescription)

    const twitterCard = document.querySelector('meta[name="twitter:card"]') ?? document.createElement('meta')
    twitterCard.setAttribute('name', 'twitter:card')
    twitterCard.setAttribute('content', 'summary_large_image')
    if (!twitterCard.parentNode) document.head.appendChild(twitterCard)
  }, [title, description, canonical])
}
