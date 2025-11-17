'use client'

import Link from 'next/link'
import { useState } from 'react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-border-primary">
      <Container>
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-mono font-bold text-text-primary hover:text-accent-primary transition-colors"
          >
            &lt;CodeBox /&gt;
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/tools"
              className="text-base font-mono text-text-secondary hover:text-accent-primary transition-colors relative group"
            >
              Tools
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-200" />
            </Link>
            <Link
              href="/docs"
              className="text-base font-mono text-text-secondary hover:text-accent-primary transition-colors relative group"
            >
              Docs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-200" />
            </Link>
            <Link
              href="/about"
              className="text-base font-mono text-text-secondary hover:text-accent-primary transition-colors relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-200" />
            </Link>
          </nav>

          {/* Right side - Search & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className="text-text-secondary hover:text-accent-primary transition-colors"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" className="text-sm px-6 py-2">
                ⭐ GitHub
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-primary">
            <nav className="flex flex-col gap-4">
              <Link
                href="/tools"
                className="text-base font-mono text-text-secondary hover:text-accent-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tools
              </Link>
              <Link
                href="/docs"
                className="text-base font-mono text-text-secondary hover:text-accent-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/about"
                className="text-base font-mono text-text-secondary hover:text-accent-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-4 border-t border-border-primary">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" className="w-full">
                    ⭐ GitHub
                  </Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  )
}
