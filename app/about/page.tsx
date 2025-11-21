import Container from '@/components/ui/Container'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - CodeBox',
  description: 'Learn about CodeBox, a free collection of 70+ online developer tools built with privacy and speed in mind.',
}

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16 bg-bg-primary min-h-screen">
      <Container>
        <div className="mb-12">
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
            About CodeBox
          </h1>
          <p className="text-lg text-text-secondary">
            Free, fast, and privacy-focused developer tools
          </p>
        </div>

        <div className="space-y-8">
          {/* Mission */}
          <section className="bg-bg-secondary border border-border-primary p-8">
            <h2 className="font-mono text-2xl font-semibold text-accent-primary mb-4">
              Our Mission
            </h2>
            <p className="text-text-secondary mb-4">
              CodeBox was built to provide developers with a comprehensive suite of high-quality tools that respect their privacy and don't slow them down.
            </p>
            <p className="text-text-secondary">
              Every tool runs entirely in your browser, ensuring your data never leaves your device. No servers, no tracking, no compromises.
            </p>
          </section>

          {/* Features */}
          <section className="bg-bg-secondary border border-border-primary p-8">
            <h2 className="font-mono text-2xl font-semibold text-accent-primary mb-4">
              Why CodeBox?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-mono text-lg text-text-primary mb-2">⚡ Lightning Fast</h3>
                <p className="text-text-secondary text-sm">
                  All processing happens instantly in your browser. No waiting for servers.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-lg text-text-primary mb-2">🔒 Privacy First</h3>
                <p className="text-text-secondary text-sm">
                  Your data never leaves your browser. No tracking, no analytics, no cookies.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-lg text-text-primary mb-2">🆓 Forever Free</h3>
                <p className="text-text-secondary text-sm">
                  All 70+ tools are completely free. No premium tiers, no paywalls.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-lg text-text-primary mb-2">🌙 Dark Mode Native</h3>
                <p className="text-text-secondary text-sm">
                  Terminal-inspired design that's easy on the eyes, day or night.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-lg text-text-primary mb-2">🎯 No Barriers</h3>
                <p className="text-text-secondary text-sm">
                  No signup, no account, no email required. Just open and use.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-lg text-text-primary mb-2">🔓 Open Source</h3>
                <p className="text-text-secondary text-sm">
                  Fully open source and MIT licensed. Review the code, contribute, fork it.
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="bg-bg-secondary border border-border-primary p-8">
            <h2 className="font-mono text-2xl font-semibold text-accent-primary mb-4">
              By The Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-accent-primary mb-2">70+</div>
                <div className="text-sm text-text-tertiary">Developer Tools</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-accent-primary mb-2">100%</div>
                <div className="text-sm text-text-tertiary">Client-Side</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-accent-primary mb-2">0</div>
                <div className="text-sm text-text-tertiary">Data Collected</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-accent-primary mb-2">$0</div>
                <div className="text-sm text-text-tertiary">Cost Forever</div>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="bg-bg-secondary border border-border-primary p-8">
            <h2 className="font-mono text-2xl font-semibold text-accent-primary mb-4">
              Built With
            </h2>
            <div className="flex flex-wrap gap-3">
              {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React', 'Vercel'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 font-mono text-sm bg-bg-tertiary border border-border-primary text-text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Open Source */}
          <section className="bg-bg-secondary border border-border-primary p-8">
            <h2 className="font-mono text-2xl font-semibold text-accent-primary mb-4">
              Open Source
            </h2>
            <p className="text-text-secondary mb-4">
              CodeBox is open source and available on GitHub under the MIT license. Contributions are welcome!
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 font-mono font-semibold bg-accent-primary text-black hover:bg-accent-dim transition-colors"
            >
              View on GitHub →
            </a>
          </section>
        </div>
      </Container>
    </div>
  )
}
