/**
 * Site Configuration
 *
 * Centralized configuration for site-wide settings.
 * Update these values with your actual information before deploying.
 */

export const siteConfig = {
  // Site Information
  name: 'CodeBox',
  description: 'Free online developer toolkit with 70+ tools. Format JSON/XML, generate hashes, convert data formats, test regex, and more. No signup required.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://codebox.dev',

  // Social Links
  // TODO: Update these with your actual social media profiles
  links: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/yourusername/codebox',
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/yourhandle',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@codebox.dev',
  },

  // Feature Flags
  features: {
    showGitHubLink: true, // Set to false to hide GitHub link
    showTwitterLink: true, // Set to false to hide Twitter link
    showEmailLink: true,   // Set to false to hide email link
  },

  // SEO
  seo: {
    title: 'CodeBox - 70+ Free Developer Tools',
    description: 'Free online developer toolkit with 70+ tools. Format JSON/XML, generate hashes, convert data formats, test regex, and more. No signup required.',
    keywords: [
      'developer tools',
      'json formatter',
      'code formatter',
      'hash generator',
      'base64 encoder',
      'regex tester',
      'online tools',
      'free tools',
    ],
  },

  // Analytics (optional)
  analytics: {
    // Add your analytics IDs here when ready
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
}

export type SiteConfig = typeof siteConfig
