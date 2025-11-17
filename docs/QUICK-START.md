# CodeBox - Quick Start Guide

> **Get started building in 5 minutes!**

---

## 🚀 Getting Started Today

### Step 1: Review the Plan (5 minutes)
Read: [`00-development-plan.md`](./00-development-plan.md)

**Key Points**:
- 📅 10-week timeline (MVP in 3-4 weeks)
- 🎯 72 tools across 8 categories
- 📊 5 development phases
- ⚡ Start with 10 essential tools

### Step 2: Set Up Your Environment (10 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/codebox.git
cd codebox

# 2. Create Next.js project
npx create-next-app@latest . --typescript --tailwind --app

# 3. Install dependencies
npm install framer-motion
npm install prismjs @types/prismjs
npm install clsx tailwind-merge

# 4. Install dev dependencies
npm install -D @tailwindcss/typography
npm install -D prettier prettier-plugin-tailwindcss

# 5. Run development server
npm run dev
```

### Step 3: Implement Design System (Day 1)

**Create `styles/globals.css`**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Colors */
    --bg-primary: #000000;
    --bg-secondary: #0a0a0a;
    --bg-tertiary: #141414;
    --bg-hover: #1a1a1a;

    --accent-primary: #00ff41;
    --accent-primary-dim: #00cc34;
    --accent-primary-glow: rgba(0, 255, 65, 0.3);

    --text-primary: #ffffff;
    --text-secondary: #a8a8a8;
    --text-tertiary: #6c6c6c;

    --border-primary: #333333;
    --border-accent: #00ff41;

    /* Spacing (8px grid) */
    --space-1: 8px;
    --space-2: 16px;
    --space-3: 24px;
    --space-4: 32px;
    --space-6: 48px;
    --space-8: 64px;
    --space-12: 96px;
  }

  body {
    @apply bg-black text-gray-300 font-sans antialiased;
  }
}
```

**Update `tailwind.config.ts`**:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#000000',
          secondary: '#0a0a0a',
          tertiary: '#141414',
          hover: '#1a1a1a',
        },
        accent: {
          primary: '#00ff41',
          dim: '#00cc34',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a8a8a8',
          tertiary: '#6c6c6c',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)'],
        sans: ['var(--font-sans)'],
      },
    },
  },
  plugins: [],
}
export default config
```

### Step 4: Set Up Fonts (Day 1)

**Update `app/layout.tsx`**:
```typescript
import { JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### Step 5: Create First Component (Day 2)

**Create `components/ui/Button.tsx`**:
```typescript
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'font-mono font-semibold uppercase tracking-wide transition-all duration-150',
        {
          // Primary button
          'bg-accent-primary text-black px-8 py-4 hover:bg-accent-dim hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] active:scale-[0.98]':
            variant === 'primary',

          // Secondary (ghost) button
          'bg-transparent text-accent-primary border-2 border-accent-primary px-8 py-4 hover:bg-accent-primary hover:text-black active:scale-[0.98]':
            variant === 'secondary',

          // Icon button
          'bg-transparent text-gray-400 border border-gray-700 w-11 h-11 flex items-center justify-center hover:text-accent-primary hover:border-accent-primary':
            variant === 'icon',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

---

## 📅 Your First Week Plan

### Monday: Project Setup
- ✅ Initialize Next.js project
- ✅ Configure Tailwind + fonts
- ✅ Set up design system (CSS variables)
- ✅ Test in browser

### Tuesday: Base Components
- ✅ Button component (3 variants)
- ✅ Input component
- ✅ Card component
- ✅ Test components

### Wednesday: Layout Components
- ✅ Header component
- ✅ Footer component
- ✅ Page container
- ✅ Build homepage skeleton

### Thursday: Homepage Sections
- ✅ Hero section
- ✅ Popular tools grid
- ✅ Categories section
- ✅ Values section

### Friday: Tool Page Template
- ✅ Create tool page layout
- ✅ Input panel component
- ✅ Output panel component
- ✅ Toast notification system

### Weekend: First Tool!
- ✅ Implement JSON Formatter
- ✅ Test functionality
- ✅ Polish UI
- 🎉 Celebrate your first tool!

---

## 🎯 Week 2-3: MVP Tools (10 tools)

**Priority Order**:
1. JSON Formatter ⭐
2. Base64 Encoder/Decoder
3. Hash Generator
4. UUID Generator
5. Regex Tester
6. URL Encoder/Decoder
7. Color Picker
8. Timestamp Converter
9. Lorem Ipsum Generator
10. Case Converter

**Goal**: Ship 10 working tools by end of Week 3

---

## 💡 Development Tips

### Code Organization
```
components/
├── ui/           # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── Modal.tsx
├── layout/       # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Container.tsx
└── tools/        # Individual tool components
    ├── JSONFormatter.tsx
    ├── Base64Encoder.tsx
    └── ...
```

### Tool Component Pattern
Every tool should follow this structure:
```typescript
'use client'
import { useState } from 'react'

export default function ToolName() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleProcess = () => {
    try {
      // Tool logic here
      const result = processInput(input)
      setOutput(result)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="tool-container">
      {/* Input Panel */}
      <div className="input-panel">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleProcess}>Process</button>
      </div>

      {/* Output Panel */}
      <div className="output-panel">
        {error && <div className="error">{error}</div>}
        <pre>{output}</pre>
      </div>
    </div>
  )
}
```

### Testing Checklist for Each Tool
- [ ] Functionality works correctly
- [ ] Error handling (try invalid input)
- [ ] Copy button works
- [ ] Download button works (if applicable)
- [ ] Mobile responsive
- [ ] Keyboard accessible

---

## 🐛 Common Issues & Solutions

### Issue: Fonts not loading
**Solution**: Check `next.config.js` has proper font configuration

### Issue: Tailwind classes not working
**Solution**: Verify `tailwind.config.ts` content paths are correct

### Issue: Component not updating
**Solution**: Ensure you're using state (`useState`) for reactive values

### Issue: Build errors
**Solution**: Check TypeScript types, run `npm run build` to catch errors

---

## 📚 Reference Docs

**Must Read**:
- [Design System](./02-design-system.md) - Colors, typography, spacing
- [Component Library](./04-component-library.md) - UI components
- [Tool Page Layout](./05-tool-page-layout.md) - Tool page structure
- [Development Plan](./00-development-plan.md) - Complete roadmap

**When Needed**:
- [Layout Specifications](./03-layout-specifications.md)
- [Responsive Design](./07-responsive-design.md)
- [Accessibility](./08-accessibility.md)
- [Performance](./09-performance-optimization.md)

---

## 🎯 Daily Checklist

Every coding session:
- [ ] Pull latest changes (`git pull`)
- [ ] Pick a task from the plan
- [ ] Code and test
- [ ] Commit with clear message
- [ ] Push to branch
- [ ] Update progress tracker

---

## 📊 Progress Tracker Template

Create a simple markdown file or use GitHub Projects:

```markdown
# CodeBox Progress Tracker

## Phase 0: Foundation ✅
- [x] Project setup
- [x] Design system
- [x] Base components
- [x] Homepage layout

## Phase 1: MVP Tools (Week 2-3)
- [x] JSON Formatter
- [ ] Base64 Encoder/Decoder
- [ ] Hash Generator
- [ ] UUID Generator
- [ ] Regex Tester
- [ ] URL Encoder/Decoder
- [ ] Color Picker
- [ ] Timestamp Converter
- [ ] Lorem Ipsum Generator
- [ ] Case Converter

## Phase 2: Popular Tools (Week 4-5)
... (to be started)

Current Tool: JSON Formatter
Status: Testing
Blockers: None
```

---

## 🚀 Launch Commands

```bash
# Development
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

---

## 🎉 Motivation

**Remember**:
- 🎯 Focus on one tool at a time
- 🚀 MVP first, polish later
- 🐛 Bugs are normal, fix and move on
- 📊 Track progress to stay motivated
- 🎊 Celebrate small wins!

**You've got this! Let's build something amazing! 💪**

---

## 📞 Get Help

If stuck:
1. Check the [documentation](./README.md)
2. Review similar tool implementation
3. Google the specific error
4. Take a break and come back fresh

---

**Ready to start? Let's go to Phase 0! 🚀**
