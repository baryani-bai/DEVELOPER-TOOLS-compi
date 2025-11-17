'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const terminalCommands = [
  {
    command: '$ npx codebox format --json',
    output: '✓ JSON formatted successfully',
  },
  {
    command: '$ npx codebox hash --sha256 "my-password"',
    output: '✓ 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
  },
  {
    command: '$ npx codebox convert --csv-to-json data.csv',
    output: '✓ Converted 1,247 rows',
  },
]

export default function HeroSection() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const command = terminalCommands[currentCommandIndex].command
    const output = terminalCommands[currentCommandIndex].output

    if (isTyping && displayedText.length < command.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(command.slice(0, displayedText.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    } else if (isTyping && displayedText.length === command.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(command + '\n' + output)
        setIsTyping(false)
      }, 500)
      return () => clearTimeout(timeout)
    } else if (!isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedText('')
        setIsTyping(true)
        setCurrentCommandIndex((prev) => (prev + 1) % terminalCommands.length)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [displayedText, isTyping, currentCommandIndex])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <section className="relative overflow-hidden py-20 md:py-32 min-h-screen flex items-center">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold text-text-primary mb-6">
            &lt;CodeBox /&gt;
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-text-secondary mb-12">
            70+ free tools for developers.{' '}
            <span className="text-accent-primary">No BS.</span>
          </p>

          {/* Terminal Box */}
          <div className="bg-bg-tertiary border-2 border-border-primary p-6 md:p-8 text-left mb-12 max-w-2xl mx-auto">
            <div className="font-mono text-sm md:text-base h-[120px] flex items-start">
              <pre className="text-accent-primary whitespace-pre-wrap break-words">
                {displayedText}
                {showCursor && <span className="inline-block w-2 h-5 bg-accent-primary ml-1 align-middle" />}
              </pre>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tools">
              <Button variant="primary">Browse Tools →</Button>
            </Link>
            <Link href="/tools/json-formatter">
              <Button variant="secondary">Quick Start: JSON</Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl -z-10" />
    </section>
  )
}
