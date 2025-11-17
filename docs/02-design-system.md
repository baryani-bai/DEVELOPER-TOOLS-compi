# Design System

## Color Palette

### Background Layers

```css
--bg-primary: #000000       /* Pure black - main background */
--bg-secondary: #0a0a0a     /* Slightly lighter - cards, elevated surfaces */
--bg-tertiary: #141414      /* Input fields, code blocks */
--bg-hover: #1a1a1a         /* Hover states */
```

**Rationale**: Pure black (#000000) maximizes contrast and creates that authentic terminal feel.

---

### Accent Colors

#### OPTION 1: Classic Terminal Green ✅ RECOMMENDED

```css
--accent-primary: #00ff41     /* Neon green - primary CTA, highlights */
--accent-primary-dim: #00cc34  /* Dimmed green - hover states */
--accent-primary-glow: rgba(0, 255, 65, 0.3)  /* Glow effects */
```

**Why this works**:
- Instant "hacker/dev" recognition
- Excellent contrast on black (15:1 ratio - AAA level)
- Nostalgic terminal vibes
- Unique in a sea of blue dev tools

#### OPTION 2: Cyan Tech

```css
--accent-primary: #00d9ff     /* Bright cyan */
--accent-primary-dim: #00b8d4
--accent-primary-glow: rgba(0, 217, 255, 0.3)
```

**Why this works**: Modern, less aggressive than green, "tech forward" feel

#### OPTION 3: Electric Blue

```css
--accent-primary: #0066ff     /* Bright blue */
--accent-primary-dim: #0052cc
--accent-primary-glow: rgba(0, 102, 255, 0.3)
```

**Why this works**: Professional, trustworthy, GitHub-inspired

---

### Syntax Highlighting Colors

For code blocks and formatted output:

```css
--syntax-keyword: #ff6b6b      /* Red - keywords */
--syntax-string: #ffd93d       /* Yellow - strings */
--syntax-number: #6bcf7f       /* Light green - numbers */
--syntax-function: #4ecdc4     /* Cyan - functions */
--syntax-comment: #6c757d      /* Gray - comments */
--syntax-operator: #a8dadc     /* Light blue - operators */
```

Inspired by popular dark themes (Dracula, Monokai) for familiarity.

---

### Text Colors

```css
--text-primary: #ffffff        /* Pure white - headings, important text */
--text-secondary: #a8a8a8      /* Light gray - body text, descriptions */
--text-tertiary: #6c6c6c       /* Mid gray - captions, labels */
--text-disabled: #404040       /* Dark gray - disabled states */
```

---

### Semantic Colors

```css
--success: #00ff41             /* Green - success states */
--error: #ff4444               /* Red - error states */
--warning: #ffd93d             /* Yellow - warning states */
--info: #00d9ff                /* Cyan - info states */
```

---

### Border Colors

```css
--border-primary: #333333      /* Default borders */
--border-secondary: #1a1a1a    /* Subtle dividers */
--border-accent: #00ff41       /* Active/focus borders */
```

---

## Typography

### Font Families

```css
/* Monospace - for code, technical elements */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;

/* Sans-serif - for UI text (minimal use) */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

### Font Loading Strategy (Next.js)

```javascript
// app/layout.tsx
import { JetBrains_Mono, Inter } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap'
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

---

### Type Scale

#### H1 (Page Titles)
```css
font-size: 48px;
line-height: 1.2 (58px);
font-weight: 700;
font-family: var(--font-mono);
color: var(--text-primary);
```

#### H2 (Section Headers)
```css
font-size: 36px;
line-height: 1.3 (47px);
font-weight: 700;
font-family: var(--font-mono);
color: var(--text-primary);
```

#### H3 (Subsections)
```css
font-size: 24px;
line-height: 1.4 (34px);
font-weight: 600;
font-family: var(--font-mono);
color: var(--text-primary);
```

#### H4 (Card Titles)
```css
font-size: 18px;
line-height: 1.5 (27px);
font-weight: 600;
font-family: var(--font-mono);
color: var(--text-primary);
```

#### Body Text
```css
font-size: 16px;
line-height: 1.6 (26px);
font-weight: 400;
font-family: var(--font-sans);
color: var(--text-secondary);
```

#### Small/Captions
```css
font-size: 14px;
line-height: 1.5 (21px);
font-weight: 400;
font-family: var(--font-sans);
color: var(--text-tertiary);
```

#### Code/Mono Text
```css
font-size: 14px;
line-height: 1.6 (22px);
font-weight: 400;
font-family: var(--font-mono);
color: var(--text-primary);
```

---

### Usage Rules

- **Monospace (JetBrains Mono)**: Headings, tool names, code blocks, technical labels, buttons
- **Sans-serif (Inter)**: Descriptions, body text, helper text (minimal use - only where readability matters)
- **Never** mix fonts in the same text block

---

## Spacing System (8px Grid)

```css
--space-1: 8px
--space-2: 16px
--space-3: 24px
--space-4: 32px
--space-5: 40px
--space-6: 48px
--space-8: 64px
--space-10: 80px
--space-12: 96px
--space-16: 128px
```

### Usage Guide

- **Between sections**: 96-128px (--space-12 to --space-16)
- **Between components**: 48-64px (--space-6 to --space-8)
- **Card padding**: 32px (--space-4)
- **Input padding**: 16px vertical, 20px horizontal (--space-2 + custom)
- **Button padding**: 16px vertical, 32px horizontal
- **Grid gaps**: 24px (--space-3)

---

## Border & Corners

### Border Radius

```css
--radius-none: 0px          /* Sharp corners - buttons, cards, inputs */
--radius-sm: 2px            /* Tiny radius - badges, tags */
--radius-md: 4px            /* Subtle - only for icons, avatars */
```

### Usage
- **Primary buttons**: 0px (sharp, terminal feel)
- **Cards**: 0px (sharp)
- **Inputs**: 0px (sharp)
- **Modals**: 0px (sharp)
- **Everything else**: 0px (maintain terminal aesthetic)

**Rationale**: Terminals have sharp corners. This maintains the aesthetic.

---

### Border Width

```css
--border-thin: 1px          /* Default borders */
--border-medium: 2px        /* Hover/focus states */
--border-thick: 3px         /* Active/pressed states */
```

---

## Shadows & Elevation

### Shadow System (Minimal - rely on borders instead)

```css
/* Level 0: Flat (no shadow) */
--shadow-none: none;

/* Level 1: Subtle outline (cards at rest) */
--shadow-sm: 0 0 0 1px var(--border-primary);

/* Level 2: Glow effect (hover, active elements) */
--shadow-glow: 0 0 20px rgba(0, 255, 65, 0.2);

/* Level 3: Strong glow (modals, focused inputs) */
--shadow-glow-strong: 0 0 40px rgba(0, 255, 65, 0.4);
```

### Usage
- **Default state**: --shadow-sm (1px border)
- **Hover state**: Add --shadow-glow
- **Focus state**: --border-accent + --shadow-glow-strong
- **Modals**: --shadow-glow-strong

**Rationale**: Terminals don't have shadows. Use borders and subtle glows for depth instead. Glow effect on accent color creates that neon "powered on" feel.

---

## Responsive Breakpoints

```css
/* Tailwind-style breakpoints */
--breakpoint-sm: 640px    /* Mobile landscape */
--breakpoint-md: 768px    /* Tablet */
--breakpoint-lg: 1024px   /* Desktop */
--breakpoint-xl: 1280px   /* Large desktop */
--breakpoint-2xl: 1536px  /* Extra large desktop */
```

### Container Widths

- **Mobile** (< 768px): 100% width, 16px padding each side
- **Tablet** (768-1023px): 90% width, max 720px
- **Desktop** (1024-1279px): 1024px max-width, centered
- **Large Desktop** (1280px+): 1200px max-width, centered
- **Extra Large** (1536px+): 1400px max-width, centered

---

## Complete CSS Variables

```css
:root {
  /* Colors - Backgrounds */
  --bg-primary: #000000;
  --bg-secondary: #0a0a0a;
  --bg-tertiary: #141414;
  --bg-hover: #1a1a1a;

  /* Colors - Accent */
  --accent-primary: #00ff41;
  --accent-primary-dim: #00cc34;
  --accent-primary-glow: rgba(0, 255, 65, 0.3);

  /* Colors - Syntax */
  --syntax-keyword: #ff6b6b;
  --syntax-string: #ffd93d;
  --syntax-number: #6bcf7f;
  --syntax-function: #4ecdc4;
  --syntax-comment: #6c757d;
  --syntax-operator: #a8dadc;

  /* Colors - Text */
  --text-primary: #ffffff;
  --text-secondary: #a8a8a8;
  --text-tertiary: #6c6c6c;
  --text-disabled: #404040;

  /* Colors - Semantic */
  --success: #00ff41;
  --error: #ff4444;
  --warning: #ffd93d;
  --info: #00d9ff;

  /* Colors - Borders */
  --border-primary: #333333;
  --border-secondary: #1a1a1a;
  --border-accent: #00ff41;

  /* Typography */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

  /* Spacing */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 40px;
  --space-6: 48px;
  --space-8: 64px;
  --space-10: 80px;
  --space-12: 96px;
  --space-16: 128px;

  /* Border Radius */
  --radius-none: 0px;
  --radius-sm: 2px;
  --radius-md: 4px;

  /* Border Width */
  --border-thin: 1px;
  --border-medium: 2px;
  --border-thick: 3px;

  /* Shadows */
  --shadow-none: none;
  --shadow-sm: 0 0 0 1px var(--border-primary);
  --shadow-glow: 0 0 20px rgba(0, 255, 65, 0.2);
  --shadow-glow-strong: 0 0 40px rgba(0, 255, 65, 0.4);

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  /* Animation Durations */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;

  /* Easing */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
}
```

---

## Tailwind Config (if using Tailwind CSS)

```javascript
// tailwind.config.js
module.exports = {
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
          disabled: '#404040',
        },
        border: {
          primary: '#333333',
          secondary: '#1a1a1a',
          accent: '#00ff41',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)'],
        sans: ['var(--font-sans)'],
      },
      spacing: {
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        5: '40px',
        6: '48px',
        8: '64px',
        10: '80px',
        12: '96px',
        16: '128px',
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        md: '4px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 255, 65, 0.2)',
        'glow-strong': '0 0 40px rgba(0, 255, 65, 0.4)',
      },
    },
  },
}
```
