import Container from '@/components/ui/Container'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog - CodeBox',
  description: 'Stay updated with the latest features, improvements, and bug fixes in CodeBox.',
}

export default function ChangelogPage() {
  return (
    <div className="py-12 md:py-16 bg-bg-primary min-h-screen">
      <Container>
        <div className="mb-12">
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Changelog
          </h1>
          <p className="text-lg text-text-secondary">
            Latest updates and improvements to CodeBox
          </p>
        </div>

        <div className="space-y-8">
          {/* Version 1.0.0 */}
          <section className="bg-bg-secondary border border-border-primary p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 font-mono text-sm bg-accent-primary text-black font-semibold">
                v1.0.0
              </span>
              <span className="text-sm text-text-tertiary font-mono">
                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            <h2 className="font-mono text-2xl font-semibold text-text-primary mb-4">
              Initial Release
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-mono text-lg text-accent-primary mb-2">✨ New Features</h3>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
                  <li>70+ developer tools across 8 categories</li>
                  <li>100% client-side processing for privacy</li>
                  <li>Terminal-inspired dark mode design</li>
                  <li>Keyboard shortcuts for common actions</li>
                  <li>Mobile-responsive interface</li>
                  <li>Copy to clipboard functionality</li>
                  <li>Download results as files</li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-lg text-accent-primary mb-2">📝 Code Formatters</h3>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
                  <li>JSON Formatter & Validator</li>
                  <li>XML Formatter & Minifier</li>
                  <li>HTML Formatter & Minifier with Live Preview</li>
                  <li>CSS Formatter & Minifier</li>
                  <li>JavaScript Formatter & Minifier</li>
                  <li>SQL Formatter</li>
                  <li>YAML Formatter</li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-lg text-accent-primary mb-2">🔐 Security Tools</h3>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
                  <li>Hash Generator (MD5, SHA-1, SHA-256, SHA-512)</li>
                  <li>Base64 Encoder & Decoder</li>
                  <li>JWT Decoder & Generator</li>
                  <li>Password Generator</li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-lg text-accent-primary mb-2">🔄 Data Converters</h3>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
                  <li>JSON ↔ YAML Converter</li>
                  <li>JSON ↔ XML Converter</li>
                  <li>JSON ↔ CSV Converter</li>
                  <li>Number Base Converter</li>
                  <li>Color Format Converter</li>
                  <li>File Size Converter</li>
                  <li>Timestamp Converter</li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-lg text-accent-primary mb-2">🎨 CSS Generators</h3>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
                  <li>CSS Gradient Generator</li>
                  <li>CSS Box Shadow Generator</li>
                  <li>Color Picker & Converter</li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-lg text-accent-primary mb-2">⚙️ Text Tools</h3>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
                  <li>Regex Tester</li>
                  <li>Text Case Converter</li>
                  <li>Text Diff Checker</li>
                  <li>Markdown Editor with Live Preview</li>
                  <li>Text Statistics Calculator</li>
                  <li>Duplicate Line Remover</li>
                  <li>Text Sorter</li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-lg text-accent-primary mb-2">🔧 Developer Utilities</h3>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
                  <li>UUID Generator</li>
                  <li>QR Code Generator</li>
                  <li>Lorem Ipsum Generator with Variants</li>
                  <li>Cron Expression Parser</li>
                  <li>Unix Permissions Calculator</li>
                  <li>Gitignore Generator</li>
                  <li>Semantic Version Checker</li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-lg text-accent-primary mb-2">🔧 Bug Fixes</h3>
                <ul className="list-disc list-inside space-y-1 text-text-secondary">
                  <li>Fixed HTML formatter indentation issues</li>
                  <li>Fixed DOMPurify SSR build error in markdown editor</li>
                  <li>Added support for void HTML elements</li>
                  <li>Improved live preview rendering</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Coming Soon */}
          <section className="bg-bg-secondary border border-border-primary p-8">
            <h2 className="font-mono text-2xl font-semibold text-text-primary mb-4">
              🚀 Coming Soon
            </h2>
            <ul className="list-disc list-inside space-y-1 text-text-secondary">
              <li>API documentation</li>
              <li>Tool favorites and history</li>
              <li>Custom tool configurations</li>
              <li>Progressive Web App (PWA) support</li>
              <li>More CSS and design generators</li>
            </ul>
          </section>
        </div>
      </Container>
    </div>
  )
}
