# Responsive Design Guidelines

## Breakpoints

```css
--breakpoint-sm: 640px    /* Mobile landscape */
--breakpoint-md: 768px    /* Tablet */
--breakpoint-lg: 1024px   /* Desktop */
--breakpoint-xl: 1280px   /* Large desktop */
--breakpoint-2xl: 1536px  /* Extra large desktop */
```

---

## Container Widths by Breakpoint

| Breakpoint | Width | Max-Width | Padding |
|------------|-------|-----------|---------|
| Mobile (< 768px) | 100% | - | 16px |
| Tablet (768-1023px) | 90% | 720px | 24px |
| Desktop (1024-1279px) | - | 1024px | 32px |
| Large (1280-1535px) | - | 1200px | 32px |
| XL (1536px+) | - | 1400px | 32px |

---

## Desktop (1024px+)

### Header
- Full horizontal navigation
- Logo (left) + Nav (center) + Search + CTA (right)
- Height: 72px

### Hero Section
- Headline: 64px
- Terminal box: 700px wide
- Two-column CTA buttons

### Tool Cards Grid
- 4 columns
- Gap: 24px
- Card height: 200px fixed

### Category Cards Grid
- 2 columns
- Gap: 32px
- Card height: 240px

### Tool Pages
- Side-by-side panels (50/50 split)
- Input panel | Output panel
- Min-height: 500px each

### Footer
- 3 columns
- Generous spacing (64px gap)

---

## Tablet (768-1023px)

### Header
- Horizontal nav OR hamburger (your choice)
- Logo (left) + Nav (center) + Search icon (right)
- Height: 68px

### Hero Section
- Headline: 52px
- Terminal box: 90% width
- Stacked CTA buttons (full-width)

### Tool Cards Grid
- 2 columns
- Gap: 24px
- Card height: 200px fixed

### Category Cards Grid
- 1 column (stack)
- Gap: 24px
- Card height: auto (flexible)

### Tool Pages
- **Option A**: Keep side-by-side (50/50) for simple tools
- **Option B**: Stack vertically for complex tools
- Min-height: 400px each

### Footer
- 2 columns OR stack to 1 column
- Reduced spacing (32px gap)

---

## Mobile (< 768px)

### Header
- Hamburger menu (left)
- Logo (center)
- Search icon (right, opens overlay)
- Height: 64px

**Hamburger Menu**:
- Full-screen overlay
- Animated slide-in from top
- Close button (X) top-right
- Stacked navigation links

### Hero Section
- Headline: 40px
- Subheadline: 16px
- Terminal box: 90% width, height: 250px
- Stacked CTA buttons (full-width)
- Reduced padding: 48px top/bottom

### Tool Cards Grid
- 1 column (stack)
- Gap: 16px
- Card height: auto (flexible)

### Category Cards Grid
- 1 column (stack)
- Gap: 16px
- Card height: auto

### Tool Pages
- **Stack vertically** (Input on top, Output below)
- "Format" button scrolls to output smoothly
- Full-width panels
- Reduced padding: 16px

### Footer
- 1 column (stack)
- Reduced spacing (24px gap)
- Reduced padding: 32px top/bottom

---

## Typography Adjustments

### Desktop (1024px+)
```css
h1: 48px
h2: 36px
h3: 24px
h4: 18px
body: 16px
small: 14px
```

### Tablet (768-1023px)
```css
h1: 40px (-8px)
h2: 32px (-4px)
h3: 22px (-2px)
h4: 18px (same)
body: 16px (same)
small: 14px (same)
```

### Mobile (< 768px)
```css
h1: 32px (-16px)
h2: 28px (-8px)
h3: 20px (-4px)
h4: 16px (-2px)
body: 16px (same)
small: 13px (-1px)
```

**Rationale**: Keep body text at 16px for readability. Only reduce headings for better fit.

---

## Spacing Adjustments

### Desktop
- Section padding: 96px top/bottom
- Component gap: 48px
- Card padding: 32px

### Tablet
- Section padding: 80px top/bottom (-16px)
- Component gap: 40px (-8px)
- Card padding: 28px (-4px)

### Mobile
- Section padding: 64px top/bottom (-32px)
- Component gap: 32px (-16px)
- Card padding: 24px (-8px)

---

## Component-Specific Responsive Behavior

### Header

**Desktop**:
```css
.header {
  display: grid;
  grid-template-columns: 160px 1fr 200px 120px;
  gap: 40px;
}
```

**Mobile**:
```css
.header {
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  gap: 16px;
}
```

---

### Hero Terminal Box

**Desktop**:
```css
.hero-terminal {
  width: 700px;
  height: 300px;
  font-size: 14px;
}
```

**Mobile**:
```css
.hero-terminal {
  width: 90%;
  height: 250px;
  font-size: 12px;
}
```

---

### Tool Cards Grid

**Desktop**:
```css
.tool-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
```

**Tablet**:
```css
.tool-grid {
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
```

**Mobile**:
```css
.tool-grid {
  grid-template-columns: 1fr;
  gap: 16px;
}
```

---

### Tool Panels (Side-by-side)

**Desktop & Tablet**:
```css
.tool-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
```

**Mobile**:
```css
.tool-panels {
  grid-template-columns: 1fr;
  gap: 24px;
}

/* Smooth scroll to output after processing */
.tool-panel--output {
  scroll-margin-top: 80px;
}
```

---

## Touch Target Sizes (Mobile)

All interactive elements should be **at least 44x44px** for touch:

```css
/* Buttons */
.btn-primary {
  min-height: 44px;
  padding: 12px 24px;
}

/* Icon buttons */
.btn-icon {
  width: 44px;
  height: 44px;
}

/* Links */
a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}
```

---

## Mobile Navigation (Hamburger Menu)

### HTML Structure
```html
<header class="header">
  <button class="hamburger" aria-label="Open menu">
    <span></span>
    <span></span>
    <span></span>
  </button>

  <a href="/" class="logo">
    <CodeBox />
  </a>

  <button class="search-icon" aria-label="Search">
    🔍
  </button>
</header>

<nav class="mobile-menu" aria-hidden="true">
  <button class="mobile-menu__close">×</button>
  <ul>
    <li><a href="/tools">Tools</a></li>
    <li><a href="/docs">Docs</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="https://github.com/...">GitHub</a></li>
  </ul>
</nav>
```

### CSS
```css
.mobile-menu {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  z-index: 1000;
  padding: 80px 32px;
  transform: translateX(-100%);
  transition: transform 300ms ease-out;
}

.mobile-menu.open {
  transform: translateX(0);
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
}

.mobile-menu li {
  margin-bottom: 32px;
}

.mobile-menu a {
  font-family: var(--font-mono);
  font-size: 24px;
  color: var(--text-primary);
  text-decoration: none;
}

.mobile-menu a:hover {
  color: var(--accent-primary);
}
```

---

## Search Overlay (Mobile)

When search icon is tapped on mobile, show full-screen search:

```html
<div class="search-overlay" aria-hidden="true">
  <div class="search-overlay__header">
    <input
      type="search"
      placeholder="Search tools..."
      autofocus
    />
    <button class="search-overlay__close">×</button>
  </div>

  <div class="search-overlay__results">
    <!-- Search results here -->
  </div>
</div>
```

```css
.search-overlay {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  z-index: 1000;
  padding: 24px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease-out;
}

.search-overlay.open {
  opacity: 1;
  pointer-events: all;
}

.search-overlay__header {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.search-overlay input {
  flex: 1;
  font-size: 18px;
  padding: 16px;
}
```

---

## Responsive Images

Use Next.js Image component:

```javascript
import Image from 'next/image'

<Image
  src="/tool-icon.svg"
  alt="Tool icon"
  width={32}
  height={32}
  sizes="(max-width: 768px) 24px, 32px"
/>
```

---

## Testing Breakpoints

### Chrome DevTools
1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Test these devices:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - iPad Pro (1024px)
   - Desktop (1920px)

### Responsive Design Mode (Firefox)
1. Open DevTools (F12)
2. Click "Responsive Design Mode" (Ctrl+Shift+M)
3. Test at: 375px, 768px, 1024px, 1280px, 1920px

---

## Mobile-Specific Optimizations

### 1. Reduce Animations on Mobile
```css
@media (max-width: 768px) {
  * {
    transition-duration: 150ms !important; /* Faster on mobile */
  }
}
```

### 2. Sticky Header on Scroll Down (Hide)
```javascript
let lastScroll = 0

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > lastScroll && currentScroll > 80) {
    // Scrolling down - hide header
    header.style.transform = 'translateY(-100%)'
  } else {
    // Scrolling up - show header
    header.style.transform = 'translateY(0)'
  }

  lastScroll = currentScroll
})
```

### 3. Disable Hover Effects on Touch Devices
```css
@media (hover: none) {
  .tool-card:hover {
    transform: none; /* No hover effect on touch */
  }
}
```

### 4. Prevent Zoom on Input Focus (iOS)
```css
input, textarea, select {
  font-size: 16px; /* iOS won't zoom if >= 16px */
}
```

---

## Responsive Utilities (Tailwind-style)

If using utility classes:

```html
<!-- Hide on mobile, show on desktop -->
<div class="hidden md:block">Desktop only</div>

<!-- Show on mobile, hide on desktop -->
<div class="block md:hidden">Mobile only</div>

<!-- Different layouts -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- Cards -->
</div>

<!-- Responsive spacing -->
<div class="p-4 md:p-6 lg:p-8">
  <!-- Content with responsive padding -->
</div>
```

---

## Performance on Mobile

### 1. Lazy Load Images Below Fold
```javascript
<Image
  src="/image.png"
  alt="..."
  loading="lazy"
/>
```

### 2. Reduce Initial Bundle Size
```javascript
// Lazy load heavy components
const HeavyTool = dynamic(() => import('@/components/HeavyTool'), {
  loading: () => <Spinner />,
  ssr: false
})
```

### 3. Optimize Web Fonts
```javascript
// Only load necessary weights
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'], // Only 2 weights on mobile
  display: 'swap'
})
```

---

## Viewport Meta Tag

**Required** in `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
```

- `width=device-width`: Use device width
- `initial-scale=1`: Don't zoom in/out on load
- `maximum-scale=5`: Allow user zoom (accessibility)

---

## Safe Area Insets (iOS Notch)

For devices with notches (iPhone X+):

```css
.header {
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

.footer {
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

## Responsive Testing Checklist

- [ ] All text is readable at 375px width (iPhone SE)
- [ ] Touch targets are at least 44x44px
- [ ] No horizontal scrolling on mobile
- [ ] Tool panels stack vertically on mobile
- [ ] Hamburger menu works smoothly
- [ ] Search overlay opens on mobile
- [ ] Cards are full-width on mobile
- [ ] Footer stacks to single column
- [ ] Typography scales appropriately
- [ ] Images load correctly on all devices
- [ ] Performance is acceptable on mobile (< 3s load)
