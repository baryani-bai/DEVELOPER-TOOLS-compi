import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ToastProvider } from '@/components/ui/Toast'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
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
