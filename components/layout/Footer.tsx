import Link from 'next/link'
import Container from '@/components/ui/Container'
import { siteConfig } from '@/lib/config/site'

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-primary pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Tools */}
          <div>
            <h3 className="text-sm font-mono font-semibold text-accent-primary uppercase tracking-wider mb-6">
              Tools
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tools/formatters"
                  className="text-sm text-text-tertiary hover:text-accent-primary transition-colors"
                >
                  Formatters
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/security"
                  className="text-sm text-text-tertiary hover:text-accent-primary transition-colors"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/generators"
                  className="text-sm text-text-tertiary hover:text-accent-primary transition-colors"
                >
                  Generators
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-text-tertiary hover:text-accent-primary transition-colors"
                >
                  All Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="text-sm font-mono font-semibold text-accent-primary uppercase tracking-wider mb-6">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-text-tertiary hover:text-accent-primary transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-text-tertiary hover:text-accent-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-sm text-text-tertiary hover:text-accent-primary transition-colors"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h3 className="text-sm font-mono font-semibold text-accent-primary uppercase tracking-wider mb-6">
              Connect
            </h3>
            <ul className="space-y-3">
              {siteConfig.features.showGitHubLink && (
                <li>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-tertiary hover:text-accent-primary transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              )}
              {siteConfig.features.showTwitterLink && (
                <li>
                  <a
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-tertiary hover:text-accent-primary transition-colors"
                  >
                    Twitter
                  </a>
                </li>
              )}
              {siteConfig.features.showEmailLink && (
                <li>
                  <a
                    href={`mailto:${siteConfig.links.email}`}
                    className="text-sm text-text-tertiary hover:text-accent-primary transition-colors"
                  >
                    Email
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-border-secondary text-center">
          <p className="text-sm text-text-tertiary">
            Built with ❤️ for developers • MIT Licensed •{' '}
            <Link href="/" className="text-accent-primary hover:underline">
              {siteConfig.name}
            </Link>
          </p>
          <p className="text-xs text-text-disabled mt-2">
            Made with Next.js • Open Source
          </p>
        </div>
      </Container>
    </footer>
  )
}
