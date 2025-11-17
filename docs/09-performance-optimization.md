# Performance Optimization Guide

## Performance Targets

### Lighthouse Scores
- **Performance**: 95+ (green)
- **Accessibility**: 100 (perfect)
- **Best Practices**: 100
- **SEO**: 100

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 1.5s
- **FID** (First Input Delay): < 50ms
- **CLS** (Cumulative Layout Shift): < 0.05

### Additional Metrics
- **FCP** (First Contentful Paint): < 1.0s
- **TTI** (Time to Interactive): < 2.5s
- **TBT** (Total Blocking Time): < 200ms

---

## Next.js Specific Optimizations

### 1. Code Splitting (Per Tool)

Lazy load heavy tool components:

```javascript
// app/tools/[tool]/page.tsx
import dynamic from 'next/dynamic'

// Lazy load tool components
const JSONFormatter = dynamic(() => import('@/components/tools/JSONFormatter'), {
  loading: () => <SkeletonLoader />,
  ssr: false // Client-side only for tools
})

const XMLFormatter = dynamic(() => import('@/components/tools/XMLFormatter'), {
  loading: () => <SkeletonLoader />,
  ssr: false
})

export default function ToolPage({ params }) {
  const Tool = getToolComponent(params.tool)
  return <Tool />
}
```

**Benefits**:
- Reduces initial bundle size
- Loads tools on-demand
- Faster initial page load

---

### 2. Image Optimization

```javascript
import Image from 'next/image'

<Image
  src="/icon.svg"
  alt="Tool icon"
  width={32}
  height={32}
  priority={false} // Don't priority icons below fold
  quality={85} // Reduce quality slightly for smaller files
/>
```

**Best Practices**:
- Use `priority={true}` for above-the-fold images only
- Lazy load below-the-fold images
- Use WebP format for raster images
- Optimize SVGs with SVGO

---

### 3. Font Loading Strategy

```javascript
// app/layout.tsx
import { JetBrains_Mono, Inter } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap', // Prevent FOIT (Flash of Invisible Text)
  preload: true
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
  preload: true
})
```

**Benefits**:
- `display: 'swap'` prevents invisible text
- `preload: true` loads fonts ASAP
- Only load required weights

---

### 4. Server Components vs Client Components

```javascript
// Server Component (default in Next.js 14+)
// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <Hero />
      <PopularTools />
    </main>
  )
}

// Client Component (interactive)
// components/JSONFormatter.tsx
'use client'

export default function JSONFormatter() {
  const [input, setInput] = useState('')
  // ... interactive logic
}
```

**Guidelines**:
- Use **Server Components** for static content (homepage, docs)
- Use **Client Components** for interactive tools
- Keep Client Components small and focused

---

## Web Workers for Heavy Processing

For tools with heavy computation (e.g., image processing, large file parsing):

```javascript
// workers/json-processor.js
self.addEventListener('message', (e) => {
  const { type, data } = e.data

  if (type === 'format') {
    try {
      const formatted = JSON.stringify(JSON.parse(data), null, 2)
      self.postMessage({ type: 'success', result: formatted })
    } catch (error) {
      self.postMessage({ type: 'error', error: error.message })
    }
  }
})
```

```javascript
// components/JSONFormatter.tsx
const worker = new Worker('/workers/json-processor.js')

worker.postMessage({ type: 'format', data: input })

worker.onmessage = (e) => {
  const { type, result, error } = e.data
  if (type === 'success') {
    setOutput(result)
  } else {
    setError(error)
  }
}
```

**Benefits**:
- Keeps UI thread free
- Prevents blocking during heavy operations
- Better user experience

---

## Virtual Scrolling (for Large Outputs)

For tools that output thousands of lines:

```javascript
import { FixedSizeList } from 'react-window'

<FixedSizeList
  height={600}
  itemCount={lines.length}
  itemSize={24}
  width="100%"
>
  {({ index, style }) => (
    <div style={style} className="code-line">
      {lines[index]}
    </div>
  )}
</FixedSizeList>
```

**Benefits**:
- Only renders visible items
- Handles millions of lines smoothly
- Dramatically reduces DOM nodes

---

## Memoization

### React.memo (Component Memoization)

```javascript
import { memo } from 'react'

const ToolCard = memo(function ToolCard({ tool }) {
  return (
    <div className="tool-card">
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
    </div>
  )
})
```

### useMemo (Value Memoization)

```javascript
import { useMemo } from 'react'

function JSONFormatter({ input }) {
  // Memoize expensive parsing
  const parsedJSON = useMemo(() => {
    try {
      return JSON.parse(input)
    } catch {
      return null
    }
  }, [input])

  return <div>{/* ... */}</div>
}
```

### useCallback (Function Memoization)

```javascript
import { useCallback } from 'react'

function ToolPanel() {
  const handleFormat = useCallback((value) => {
    // ... formatting logic
    formatJSON(value)
  }, []) // Dependencies

  return <button onClick={handleFormat}>Format</button>
}
```

---

## Debouncing Live Updates

Prevent too many updates during user typing:

```javascript
import { useDebouncedCallback } from 'use-debounce'

function JSONFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const debouncedFormat = useDebouncedCallback(
    (value) => {
      // Format JSON as user types
      try {
        const formatted = JSON.stringify(JSON.parse(value), null, 2)
        setOutput(formatted)
      } catch {
        setOutput('Invalid JSON')
      }
    },
    300 // Wait 300ms after user stops typing
  )

  const handleInputChange = (e) => {
    setInput(e.target.value)
    debouncedFormat(e.target.value)
  }

  return <textarea value={input} onChange={handleInputChange} />
}
```

---

## Bundle Size Optimization

### 1. Analyze Bundle

```bash
npm run build
# Next.js will show bundle sizes

# Or use Bundle Analyzer
npm install @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... config
})
```

Run: `ANALYZE=true npm run build`

---

### 2. Tree Shaking

Import only what you need:

```javascript
// ❌ Bad: Imports entire library
import _ from 'lodash'

// ✅ Good: Import specific function
import debounce from 'lodash/debounce'

// ✅ Even better: Use ES6
const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
```

---

### 3. Remove Unused Dependencies

```bash
npm install -g depcheck
depcheck
```

---

## Caching Strategies

### 1. Static Assets

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

---

### 2. API Route Caching

```javascript
// app/api/tools/route.ts
export async function GET() {
  const tools = getTools()

  return Response.json(tools, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
```

---

### 3. Client-Side Caching

```javascript
// Use SWR or React Query
import useSWR from 'swr'

function ToolList() {
  const { data, error } = useSWR('/api/tools', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return <div>{/* render tools */}</div>
}
```

---

## CSS Optimization

### 1. Critical CSS

Next.js automatically inlines critical CSS. Ensure your CSS is optimized:

```css
/* Split CSS into smaller modules */
/* components/Button/Button.module.css */
.button {
  /* styles */
}
```

---

### 2. Remove Unused CSS

```bash
# Use PurgeCSS with Tailwind
# tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
}
```

---

### 3. CSS-in-JS Optimization

If using CSS-in-JS (styled-components, emotion):

```javascript
// Use CSS Modules instead (faster)
import styles from './Button.module.css'

<button className={styles.button}>Click me</button>
```

---

## JavaScript Optimization

### 1. Minification

Next.js automatically minifies JS in production. Ensure it's enabled:

```javascript
// next.config.js
module.exports = {
  swcMinify: true, // Use SWC for faster minification
}
```

---

### 2. Remove Console Logs

```javascript
// next.config.js
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
```

---

### 3. Use Native APIs

Prefer native JavaScript over libraries when possible:

```javascript
// ❌ Using library for simple task
import moment from 'moment'
const date = moment().format('YYYY-MM-DD')

// ✅ Using native API
const date = new Date().toISOString().split('T')[0]
```

---

## Network Optimization

### 1. HTTP/2

Ensure your hosting supports HTTP/2 (Vercel, Netlify do by default)

---

### 2. Compression

Enable gzip/brotli compression:

```javascript
// next.config.js
module.exports = {
  compress: true, // Enable gzip
}
```

---

### 3. CDN

Use a CDN for static assets (Vercel Edge Network, Cloudflare)

---

## Resource Hints

```html
<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Prefetch important pages -->
<link rel="prefetch" href="/tools/json-formatter">

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/jetbrains-mono.woff2" as="font" type="font/woff2" crossorigin>
```

---

## Monitoring & Debugging

### 1. Lighthouse (Chrome DevTools)

```bash
# Run Lighthouse
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Analyze page load"
4. Review scores and suggestions
```

---

### 2. WebPageTest

Test from multiple locations:
https://www.webpagetest.org

---

### 3. Next.js Built-in Analytics

```javascript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## Performance Checklist

### Initial Load
- [ ] First Contentful Paint < 1.0s
- [ ] Largest Contentful Paint < 1.5s
- [ ] Total Blocking Time < 200ms
- [ ] Cumulative Layout Shift < 0.05

### Assets
- [ ] Images optimized (WebP, lazy loaded)
- [ ] Fonts preloaded with font-display: swap
- [ ] CSS minified and critical CSS inlined
- [ ] JavaScript code-split by route

### Caching
- [ ] Static assets cached (1 year)
- [ ] API responses cached appropriately
- [ ] Browser caching enabled

### Bundle
- [ ] Main bundle < 200KB gzipped
- [ ] Total JS < 500KB gzipped
- [ ] No duplicate dependencies

### Runtime
- [ ] React components memoized where appropriate
- [ ] Heavy operations moved to Web Workers
- [ ] Virtual scrolling for large lists
- [ ] Debounced user inputs

---

## Performance Budget

| Resource Type | Budget (gzipped) |
|---------------|------------------|
| HTML | < 20KB |
| CSS | < 50KB |
| JavaScript (initial) | < 200KB |
| JavaScript (total) | < 500KB |
| Images (per page) | < 500KB |
| Fonts | < 100KB |
| **Total Page Weight** | **< 1MB** |

---

## Tools & Resources

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [web.dev](https://web.dev/measure/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
