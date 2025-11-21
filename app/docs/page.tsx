import Container from '@/components/ui/Container'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation - CodeBox',
  description: 'Learn how to use CodeBox developer tools. Comprehensive guides and documentation for all 70+ tools.',
}

export default function DocsPage() {
  return (
    <div className="py-12 md:py-16 bg-bg-primary min-h-screen">
      <Container>
        <div className="mb-12">
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Documentation
          </h1>
          <p className="text-lg text-text-secondary">
            Comprehensive guides for using CodeBox developer tools
          </p>
        </div>

        <div className="space-y-8">
          {/* Getting Started */}
          <section className="bg-bg-secondary border border-border-primary p-8">
            <h2 className="font-mono text-2xl font-semibold text-accent-primary mb-4">
              Getting Started
            </h2>
            <p className="text-text-secondary mb-4">
              CodeBox is a collection of 70+ free online developer tools. All tools run entirely in your browser - no data is sent to any server.
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>No signup or account required</li>
              <li>100% client-side processing</li>
              <li>Privacy-first design</li>
              <li>Free and open source</li>
            </ul>
          </section>

          {/* Tool Categories */}
          <section className="bg-bg-secondary border border-border-primary p-8">
            <h2 className="font-mono text-2xl font-semibold text-accent-primary mb-4">
              Tool Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-bg-tertiary border border-border-primary p-4">
                <h3 className="font-mono text-lg text-text-primary mb-2">Formatters</h3>
                <p className="text-sm text-text-tertiary">Format and beautify JSON, XML, HTML, CSS, JavaScript, SQL, and more</p>
              </div>
              <div className="bg-bg-tertiary border border-border-primary p-4">
                <h3 className="font-mono text-lg text-text-primary mb-2">Security</h3>
                <p className="text-sm text-text-tertiary">Hash generation, Base64 encoding, JWT tools, password generation</p>
              </div>
              <div className="bg-bg-tertiary border border-border-primary p-4">
                <h3 className="font-mono text-lg text-text-primary mb-2">Converters</h3>
                <p className="text-sm text-text-tertiary">Convert between data formats, color formats, number bases, and more</p>
              </div>
              <div className="bg-bg-tertiary border border-border-primary p-4">
                <h3 className="font-mono text-lg text-text-primary mb-2">Generators</h3>
                <p className="text-sm text-text-tertiary">UUID, QR codes, Lorem Ipsum, CSS gradients, and more</p>
              </div>
            </div>
          </section>

          {/* Keyboard Shortcuts */}
          <section className="bg-bg-secondary border border-border-primary p-8">
            <h2 className="font-mono text-2xl font-semibold text-accent-primary mb-4">
              Keyboard Shortcuts
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <kbd className="px-3 py-2 font-mono bg-bg-tertiary border border-border-primary text-accent-primary">
                  Ctrl + Enter
                </kbd>
                <span className="text-text-secondary">Execute tool action (format, convert, generate)</span>
              </div>
              <div className="flex items-center gap-4">
                <kbd className="px-3 py-2 font-mono bg-bg-tertiary border border-border-primary text-accent-primary">
                  Ctrl + K
                </kbd>
                <span className="text-text-secondary">Clear input or search tools</span>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="bg-bg-secondary border border-border-primary p-8">
            <h2 className="font-mono text-2xl font-semibold text-accent-primary mb-4">
              Privacy & Security
            </h2>
            <p className="text-text-secondary mb-4">
              Your privacy is our priority. Here's how we protect it:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>All tools run 100% client-side in your browser</li>
              <li>No data is ever sent to our servers</li>
              <li>No cookies, tracking, or analytics</li>
              <li>No account or personal information required</li>
              <li>Open source code available for review</li>
            </ul>
          </section>
        </div>
      </Container>
    </div>
  )
}
