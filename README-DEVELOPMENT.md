# CodeBox - Development Guide

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Visit http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 📦 Project Structure

```
codebox/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with Header/Footer
│   └── page.tsx             # Homepage
│
├── components/
│   ├── homepage/            # Homepage sections
│   │   ├── HeroSection.tsx          # Hero with terminal animation
│   │   ├── PopularToolsSection.tsx  # 8 popular tools grid
│   │   ├── CategoriesSection.tsx    # 8 categories grid
│   │   └── ValuesSection.tsx        # 6 value propositions
│   │
│   ├── layout/              # Layout components
│   │   ├── Header.tsx       # Top navigation
│   │   └── Footer.tsx       # Footer links
│   │
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx       # Button (3 variants)
│       ├── Card.tsx         # Card component
│       └── Container.tsx    # Max-width container
│
├── lib/
│   ├── constants/
│   │   └── tools.ts         # Tools & categories data
│   └── utils/
│       └── cn.ts            # Class name utility
│
├── styles/
│   └── globals.css          # Global styles + design system
│
├── public/                  # Static assets
│
├── docs/                    # Project documentation
│   ├── 00-development-plan.md
│   ├── QUICK-START.md
│   └── ... (11 more docs)
│
├── package.json
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.js           # Next.js configuration
```

---

## 🎨 Design System

### Colors

```css
/* Pure black backgrounds */
--bg-primary: #000000
--bg-secondary: #0a0a0a
--bg-tertiary: #141414

/* Neon green accent */
--accent-primary: #00ff41

/* Text colors */
--text-primary: #ffffff
--text-secondary: #a8a8a8
--text-tertiary: #6c6c6c

/* Borders */
--border-primary: #333333
--border-accent: #00ff41
```

### Typography

- **Headings**: JetBrains Mono (monospace)
- **Body**: Inter (sans-serif)

### Spacing (8px grid)

```css
--space-2: 16px
--space-4: 32px
--space-6: 48px
--space-8: 64px
--space-12: 96px
```

---

## 🧱 Component Usage

### Button

```tsx
import Button from '@/components/ui/Button'

// Primary button (neon green background)
<Button variant="primary">Browse Tools →</Button>

// Secondary button (outline)
<Button variant="secondary">Learn More</Button>

// Icon button
<Button variant="icon">🔍</Button>
```

### Card

```tsx
import Card from '@/components/ui/Card'

<Card
  title="JSON Formatter"
  description="Format and validate JSON"
  icon="{ }"
  href="/tools/json-formatter"
>
  <Button variant="secondary">Use →</Button>
</Card>
```

---

## 📝 What's Been Built

### ✅ Phase 0: Foundation (Complete!)

- [x] Next.js project setup
- [x] Design system implementation
- [x] UI component library
- [x] Layout components (Header, Footer)
- [x] Homepage with 4 sections
  - [x] Hero with terminal animation
  - [x] Popular tools grid (8 tools)
  - [x] Categories section (8 categories)
  - [x] Values section (6 values)

### 🎯 Phase 1: Next Steps

Now we'll build the **10 MVP tools**:

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

---

## 🎨 Terminal Animation

The hero section features a cool typing animation that cycles through commands:

```
$ npx codebox format --json
✓ JSON formatted successfully

$ npx codebox hash --sha256 "my-password"
✓ 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8

$ npx codebox convert --csv-to-json data.csv
✓ Converted 1,247 rows
```

It types out each command with a blinking cursor, waits, then cycles to the next one!

---

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Fonts**: JetBrains Mono, Inter (via next/font)
- **Utilities**: clsx, tailwind-merge

---

## 🎯 Key Features

### Terminal Elite Design
- Pure black (#000000) backgrounds
- Neon green (#00ff41) accents
- Sharp corners (no border-radius)
- Subtle glow effects on hover

### Accessibility
- WCAG AA compliant color contrast
- Keyboard navigable
- Focus visible states
- Semantic HTML

### Performance
- Optimized fonts with next/font
- Minimal JavaScript
- Fast page loads
- SEO optimized

### Responsive
- Mobile-first design
- Hamburger menu on mobile
- Responsive grids (4 → 2 → 1 columns)
- Touch-friendly (44x44px minimum)

---

## 📚 Documentation

Full documentation available in `/docs`:

- [Development Plan](./docs/00-development-plan.md) - 10-week roadmap
- [Quick Start](./docs/QUICK-START.md) - Get coding in 5 min
- [Design System](./docs/02-design-system.md) - Colors, typography
- [Component Library](./docs/04-component-library.md) - UI components
- [Tools Catalog](./docs/11-tools-catalog.md) - All 72 tools

---

## 🐛 Troubleshooting

### Port already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Dependencies not found

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
# Check for type errors
npm run type-check
```

---

## 🎉 What's Next?

Now that the homepage is built, we can start implementing tools! Let's begin with the **JSON Formatter** (the most important tool).

Follow the development plan in `docs/00-development-plan.md` to build all 72 tools over the next 10 weeks!

---

**Built with ❤️ for developers**
