'use client'

import { useEffect } from 'react'

const DEFAULT_TITLE = 'Sky Dental Center | Your Smile. Your Confidence. Our Expert Care.'
const DEFAULT_DESCRIPTION =
  'Sky Dental Center – Expert dental care in Abu Dhabi. Your smile, your confidence. General dentistry, implants, orthodontics, cosmetic dentistry, and pediatric care. Book your appointment today.'

/**
 * Sets document title and meta description for the current page (SEO).
 * Call once per page, e.g. in the page component.
 */
export function usePageSEO(title?: string, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Sky Dental Center` : DEFAULT_TITLE
    document.title = fullTitle

    const metaDescription = document.querySelector('meta[name="description"]')
    const value = description ?? DEFAULT_DESCRIPTION
    if (metaDescription) {
      metaDescription.setAttribute('content', value)
    }

    return () => {
      document.title = DEFAULT_TITLE
      if (metaDescription) {
        metaDescription.setAttribute('content', DEFAULT_DESCRIPTION)
      }
    }
  }, [title, description])
}
