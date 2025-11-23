import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ToastProvider } from '@/components/ui/Toast'

// Using system fonts to avoid external CDN dependency and build failures
const fontMono = {
  variable: '--font-mono',
  style: {
    fontFamily: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  },
}

const fontSans = {
  variable: '--font-sans',
  style: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
}

export const metadata: Metadata = {
  title: 'CodeBox - 70+ Free Developer Tools',
  description:
    'Free online developer toolkit with 70+ tools. Format JSON/XML, generate hashes, convert data formats, test regex, and more. No signup required.',
  keywords: [
    'developer tools',
    'json formatter',
    'code formatter',
    'hash generator',
    'base64 encoder',
    'regex tester',
  ],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://codebox.dev'),
  openGraph: {
    title: 'CodeBox - 70+ Free Developer Tools',
    description: 'Free online developer toolkit with 70+ tools. Privacy-first, client-side processing.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeBox - 70+ Free Developer Tools',
    description: 'Free online developer toolkit with 70+ tools. Privacy-first, client-side processing.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fontMono.variable} ${fontSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ToastProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
