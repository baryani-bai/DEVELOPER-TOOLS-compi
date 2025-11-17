# CodeBox Development Guide

Complete guide for developing, running, and deploying the CodeBox developer tools webapp.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Adding New Tools](#adding-new-tools)
- [Component Reference](#component-reference)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd DEVELOPER-TOOLS-compi

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Available Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

---

## 📁 Project Structure

```
DEVELOPER-TOOLS-compi/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with fonts & providers
│   ├── page.tsx                 # Homepage
│   └── tools/
│       └── [slug]/
│           └── page.tsx         # Dynamic tool pages
│
├── components/
│   ├── homepage/                # Homepage sections
│   │   ├── HeroSection.tsx      # Terminal animation hero
│   │   ├── PopularToolsSection.tsx
│   │   ├── CategoriesSection.tsx
│   │   └── ValuesSection.tsx
│   │
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Sticky header with nav
│   │   └── Footer.tsx           # Site footer
│   │
│   ├── tools/                   # Tool implementations
│   │   ├── JsonFormatter.tsx
│   │   ├── Base64EncoderDecoder.tsx
│   │   ├── UrlEncoderDecoder.tsx
│   │   ├── UuidGenerator.tsx
│   │   ├── LoremIpsumGenerator.tsx
│   │   ├── ToolPanel.tsx        # Reusable input panel
│   │   └── CodeDisplay.tsx      # Reusable output panel
│   │
│   └── ui/                      # UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Container.tsx
│       ├── Toast.tsx            # Notification system
│       └── KeyboardHint.tsx     # Keyboard shortcut display
│
├── lib/
│   ├── constants/
│   │   └── toolRegistry.ts      # Central tool configuration
│   │
│   ├── hooks/
│   │   └── useKeyboardShortcuts.ts  # Keyboard shortcut hook
│   │
│   └── utils/
│       ├── cn.ts                # Tailwind class merger
│       ├── toolHelpers.ts       # Tool utility functions
│       └── syntaxHighlight.ts   # JSON syntax highlighting
│
├── styles/
│   └── globals.css              # Global styles & design system
│
├── docs/                        # Design documentation
│   ├── 00-development-plan.md
│   ├── 01-project-overview.md
│   ├── 02-design-system.md
│   └── ... (11 design docs)
│
├── public/                      # Static assets
├── .gitignore
├── package.json
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── next.config.js               # Next.js configuration
```

---

## 🏗️ Architecture

### Design System

**Terminal Elite Aesthetic:**
- Background: Pure black `#000000`
- Accent: Neon green `#00ff41`
- Typography: JetBrains Mono (mono) + Inter (sans)
- Spacing: 8px grid system
- Contrast ratio: 21:1 (WCAG AAA)

**CSS Variables:**
```css
--bg-primary: #000000
--bg-secondary: #0a0a0a
--bg-tertiary: #141414
--accent-primary: #00ff41
--text-primary: #ffffff
--text-secondary: #a8a8a8
--space-1: 8px (increments by 8)
```

### Component Composition Pattern

All tools follow a consistent composition pattern:

```typescript
Tool Component
├── ToolPanel (Input)
│   ├── Title & Clear button
│   ├── Textarea
│   └── Options (buttons, checkboxes)
└── CodeDisplay (Output)
    ├── Title & Action buttons
    ├── Code with syntax highlighting
    └── Copy/Download buttons
```

### State Management

- **Local State:** useState for component-specific state
- **Context:** ToastProvider for global notifications
- **No external state management:** Keeps it simple and fast

### Routing

- **Dynamic Routes:** `/tools/[slug]` maps to tool IDs
- **Static Generation:** generateStaticParams pre-renders all tool pages
- **SEO:** generateMetadata for each tool page

---

## ➕ Adding New Tools

Follow this step-by-step guide to add a new tool:

### Step 1: Add Tool to Registry

Edit `lib/constants/toolRegistry.ts`:

```typescript
{
  id: 'my-tool',  // URL slug
  name: 'My Awesome Tool',
  description: 'Short description for SEO',
  category: 'Text Transformers',  // Pick existing category
  icon: '🎯',  // Emoji icon
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3',
  ],
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  popular: false,  // Set true to show on homepage
}
```

### Step 2: Create Tool Component

Create `components/tools/MyTool.tsx`:

```typescript
'use client'

import { useState } from 'react'
import ToolPanel from './ToolPanel'
import CodeDisplay from './CodeDisplay'
import Button from '@/components/ui/Button'
import KeyboardHint from '@/components/ui/KeyboardHint'
import { useToast } from '@/components/ui/Toast'
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts'

export default function MyTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string>()
  const { showToast } = useToast()

  const handleProcess = () => {
    if (!input.trim()) {
      setError('Please enter some text')
      setOutput('')
      return
    }

    try {
      // Your tool logic here
      const result = processInput(input)
      setOutput(result)
      setError(undefined)
      showToast('Processed successfully!', 'success')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process'
      setError(errorMessage)
      setOutput('')
      showToast(errorMessage, 'error')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError(undefined)
  }

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlKey: true,
      handler: handleProcess,
      description: 'Process input',
    },
    {
      key: 'k',
      ctrlKey: true,
      handler: handleClear,
      description: 'Clear input',
    },
  ])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <ToolPanel
          title="Input"
          value={input}
          onChange={setInput}
          onClear={handleClear}
          placeholder="Enter text here..."
          rows={20}
        >
          {/* Add options here */}
          <Button variant="primary" onClick={handleProcess}>
            Process
          </Button>
        </ToolPanel>

        {/* Output Panel */}
        <CodeDisplay
          title="Output"
          code={output}
          error={error}
          language="text"
          filename="output.txt"
        />
      </div>

      {/* Keyboard Shortcuts */}
      <KeyboardHint
        shortcuts={[
          { keys: 'Ctrl+Enter', action: 'Process' },
          { keys: 'Ctrl+K', action: 'Clear' },
        ]}
      />
    </div>
  )
}
```

### Step 3: Register Component in Dynamic Route

Edit `app/tools/[slug]/page.tsx`:

```typescript
import MyTool from '@/components/tools/MyTool'

const toolComponents: Record<string, React.ComponentType> = {
  // ... existing tools
  'my-tool': MyTool,  // Add your tool
}
```

### Step 4: Add Utility Functions (if needed)

Add helper functions to `lib/utils/toolHelpers.ts`:

```typescript
export function processInput(input: string): string {
  // Your processing logic
  return result
}
```

### Step 5: Test Your Tool

```bash
# Type check
npx tsc --noEmit

# Run dev server
npm run dev

# Visit http://localhost:3000/tools/my-tool
```

---

## 📦 Component Reference

### ToolPanel

Reusable input panel for tools.

```typescript
<ToolPanel
  title="Input"                    // Panel title
  value={input}                    // Controlled value
  onChange={setInput}              // Change handler
  onClear={handleClear}            // Clear button handler
  placeholder="Enter text..."      // Textarea placeholder
  rows={20}                        // Textarea rows
  readOnly={false}                 // Make read-only
>
  {/* Add buttons, options, etc. */}
</ToolPanel>
```

### CodeDisplay

Reusable output panel with copy/download.

```typescript
<CodeDisplay
  title="Output"                   // Panel title
  code={output}                    // Code to display
  error={error}                    // Error message (optional)
  language="json"                  // Language for highlighting
  filename="output.txt"            // Download filename
/>
```

### Toast

Show notifications to users.

```typescript
const { showToast } = useToast()

showToast('Success message', 'success')  // Green
showToast('Error message', 'error')      // Red
showToast('Warning message', 'warning')  // Yellow
showToast('Info message', 'info')        // Blue
```

### useKeyboardShortcuts

Add keyboard shortcuts to your tool.

```typescript
useKeyboardShortcuts([
  {
    key: 'Enter',
    ctrlKey: true,           // Ctrl on Windows, Cmd on Mac
    handler: handleAction,
    description: 'Run action',
  },
])
```

---

## 🔄 Development Workflow

### 1. Local Development

```bash
npm run dev
```

- Hot reload enabled
- Fast Refresh for React components
- TypeScript type checking in IDE

### 2. Code Quality

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Fix lint issues
npm run lint -- --fix
```

### 3. Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-tool

# Make changes and commit
git add .
git commit -m "Add My Tool with XYZ features"

# Push to remote
git push -u origin feature/my-tool
```

---

## 🧪 Testing

### Manual Testing Checklist

For each tool, verify:

- [ ] Input validation works
- [ ] Output displays correctly
- [ ] Copy to clipboard works
- [ ] Download file works
- [ ] Toast notifications appear
- [ ] Keyboard shortcuts work (Ctrl+Enter, Ctrl+K)
- [ ] Clear button works
- [ ] Error handling works
- [ ] Responsive on mobile (320px+)
- [ ] Accessible (keyboard navigation, screen readers)

### Browser Testing

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari (Mac/iOS)

### Performance Testing

```bash
npm run build
npm run start

# Check Lighthouse scores
# Target: 90+ for all metrics
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Configure:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`
4. Deploy!

### Environment Variables

No environment variables needed - everything runs client-side!

### Build Output

```bash
npm run build

# Generates optimized build in .next/
# Static assets in .next/static/
# All tool pages pre-rendered
```

---

## 🎨 Design Guidelines

### Colors

Use CSS variables from design system:
```css
bg-bg-primary       /* Pure black */
bg-bg-secondary     /* Slightly lighter */
text-accent-primary /* Neon green */
text-text-primary   /* White */
```

### Spacing

Use 8px grid system:
```css
p-1  /* 8px */
p-2  /* 16px */
p-3  /* 24px */
p-4  /* 32px */
```

### Typography

```css
font-mono   /* JetBrains Mono (code, buttons) */
font-sans   /* Inter (body text) */
```

---

## 📝 Best Practices

### Performance

- ✅ Use `useMemo` for expensive computations
- ✅ Use `useCallback` for event handlers
- ✅ Keep components small and focused
- ✅ Lazy load heavy libraries

### Accessibility

- ✅ Use semantic HTML
- ✅ Add ARIA labels to icon buttons
- ✅ Ensure 21:1 contrast ratio
- ✅ Support keyboard navigation
- ✅ Test with screen readers

### SEO

- ✅ Add unique title/description per tool
- ✅ Use semantic heading structure (h1 → h2 → h3)
- ✅ Include relevant keywords
- ✅ Generate static pages

---

## 🐛 Troubleshooting

### Build Errors

**Font loading fails:**
- Network issue - fonts will be retried
- Build will work on Vercel

**TypeScript errors:**
```bash
npx tsc --noEmit --watch
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Runtime Errors

**Toast not appearing:**
- Ensure component is wrapped in `<ToastProvider>`

**Keyboard shortcuts not working:**
- Check `useKeyboardShortcuts` is called after handlers are defined

---

## 📚 Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🤝 Contributing

1. Read this guide
2. Check existing issues
3. Create feature branch
4. Follow code style
5. Test thoroughly
6. Submit PR

---

## 📄 License

MIT License - See LICENSE file

---

**Need help?** Open an issue on GitHub!
