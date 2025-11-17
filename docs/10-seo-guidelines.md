# SEO Guidelines & Recommendations

## Target Keywords

### Primary Keywords
- free developer tools
- online code formatter
- developer utilities
- web developer tools
- code converter online

### Tool-Specific Keywords
- JSON formatter
- XML formatter
- Base64 encoder
- hash generator
- regex tester
- UUID generator
- markdown to HTML
- color picker

### Long-Tail Keywords
- free JSON formatter online
- validate JSON online
- convert JSON to CSV
- SHA-256 hash generator
- online regex tester with examples

---

## Page Titles & Meta Descriptions

### Homepage

```html
<title>CodeBox - 70+ Free Developer Tools | Format, Convert, Generate</title>

<meta
  name="description"
  content="Free online developer toolkit with 70+ tools. Format JSON/XML, generate hashes, convert data formats, test regex, and more. No signup required, works offline."
/>
```

**Character Limits**:
- Title: 50-60 characters (✅ 65 chars)
- Description: 150-160 characters (✅ 156 chars)

---

### Tool Pages (Template)

```html
<title>[Tool Name] - Free Online [Tool Type] | CodeBox</title>

<meta
  name="description"
  content="[Tool description in 1-2 sentences]. Fast, free, and works in your browser. Part of CodeBox developer toolkit."
/>
```

**Example: JSON Formatter**

```html
<title>JSON Formatter & Validator - Free Online Tool | CodeBox</title>

<meta
  name="description"
  content="Format and validate JSON instantly in your browser. Syntax highlighting, error detection, and beautification. No file upload required."
/>
```

**Example: Base64 Encoder**

```html
<title>Base64 Encoder & Decoder - Free Online Tool | CodeBox</title>

<meta
  name="description"
  content="Encode and decode Base64 strings instantly. Supports text, files, and URLs. Client-side processing ensures privacy."
/>
```

---

## Structured Data (Schema.org)

### Website Schema (Homepage)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CodeBox",
  "description": "70+ free developer tools for formatting, converting, and generating code",
  "url": "https://codebox.dev",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Organization",
    "name": "CodeBox"
  },
  "browserRequirements": "Requires JavaScript. Works in all modern browsers."
}
</script>
```

---

### SoftwareApplication Schema (Tool Pages)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "JSON Formatter",
  "description": "Format and validate JSON data with syntax highlighting",
  "url": "https://codebox.dev/tools/json-formatter",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Syntax highlighting",
    "Error detection",
    "Customizable indentation",
    "Client-side processing"
  ]
}
</script>
```

---

### BreadcrumbList Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://codebox.dev"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Code Formatters",
      "item": "https://codebox.dev/tools/formatters"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "JSON Formatter",
      "item": "https://codebox.dev/tools/json-formatter"
    }
  ]
}
</script>
```

---

## Open Graph Tags (Social Sharing)

### Homepage

```html
<meta property="og:type" content="website">
<meta property="og:title" content="CodeBox - 70+ Free Developer Tools">
<meta property="og:description" content="Format, convert, generate - all in your browser. No signup required.">
<meta property="og:url" content="https://codebox.dev">
<meta property="og:image" content="https://codebox.dev/og-image.png">
<meta property="og:site_name" content="CodeBox">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="CodeBox - 70+ Free Developer Tools">
<meta name="twitter:description" content="Format, convert, generate - all in your browser">
<meta name="twitter:image" content="https://codebox.dev/og-image.png">
<meta name="twitter:creator" content="@yourusername">
```

---

### Tool Pages

```html
<meta property="og:type" content="website">
<meta property="og:title" content="JSON Formatter - Free Online Tool">
<meta property="og:description" content="Format and validate JSON instantly in your browser">
<meta property="og:url" content="https://codebox.dev/tools/json-formatter">
<meta property="og:image" content="https://codebox.dev/og-image-json-formatter.png">

<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="JSON Formatter - Free Online Tool">
<meta name="twitter:description" content="Format and validate JSON instantly">
<meta name="twitter:image" content="https://codebox.dev/og-image-json-formatter.png">
```

**OG Image Specs**:
- Size: 1200x630px
- Format: PNG or JPEG
- Max file size: 8MB
- Design: Dark background, neon green accent, show tool name and icon

---

## URL Structure

### Best Practices

```
https://codebox.dev/
https://codebox.dev/tools
https://codebox.dev/tools/formatters
https://codebox.dev/tools/json-formatter
https://codebox.dev/tools/base64-encoder
https://codebox.dev/docs
https://codebox.dev/docs/json-formatter
https://codebox.dev/about
```

**Guidelines**:
- Use lowercase only
- Use hyphens (not underscores) for word separation
- Keep URLs short and descriptive
- Include target keyword in URL
- Avoid special characters

---

## Canonical URLs

Prevent duplicate content issues:

```html
<link rel="canonical" href="https://codebox.dev/tools/json-formatter">
```

---

## Sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://codebox.dev/</loc>
    <lastmod>2025-01-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Tool pages -->
  <url>
    <loc>https://codebox.dev/tools/json-formatter</loc>
    <lastmod>2025-01-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Category pages -->
  <url>
    <loc>https://codebox.dev/tools/formatters</loc>
    <lastmod>2025-01-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

**Next.js Generation**:

```javascript
// app/sitemap.ts
export default function sitemap() {
  const tools = getTools()

  return [
    {
      url: 'https://codebox.dev',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...tools.map((tool) => ({
      url: `https://codebox.dev/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ]
}
```

---

## Robots.txt

```
User-agent: *
Allow: /

Sitemap: https://codebox.dev/sitemap.xml
```

**Next.js**:

```javascript
// app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://codebox.dev/sitemap.xml',
  }
}
```

---

## Content Structure (On-Page SEO)

### Tool Documentation Section

Add below each tool for SEO + user help:

```html
<section class="tool-documentation">
  <h2>How to Use JSON Formatter</h2>
  <ol>
    <li>Paste your JSON data into the input panel</li>
    <li>Click "Format JSON" or press Cmd+Enter</li>
    <li>Copy the formatted result or download as file</li>
  </ol>

  <h2>Features</h2>
  <ul>
    <li>Syntax highlighting for readability</li>
    <li>Error detection and validation</li>
    <li>Customizable indentation (2/4 spaces, tabs)</li>
    <li>Works 100% in your browser (data never sent to server)</li>
  </ul>

  <h2>Why Use JSON Formatter?</h2>
  <p>
    JSON (JavaScript Object Notation) is a lightweight data format used for data exchange.
    Minified JSON is hard to read. Our formatter beautifies JSON with proper indentation
    and syntax highlighting, making it easy to understand and debug.
  </p>

  <h2>Common Use Cases</h2>
  <ul>
    <li>Format API responses for debugging</li>
    <li>Validate JSON configuration files</li>
    <li>Pretty-print minified JSON</li>
    <li>Check JSON syntax before deployment</li>
  </ul>

  <h2>FAQ</h2>
  <details>
    <summary>Is my data safe?</summary>
    <p>
      Yes! All processing happens client-side in your browser.
      Your data never leaves your device and is not sent to any server.
    </p>
  </details>

  <details>
    <summary>What's the file size limit?</summary>
    <p>
      No hard limit! Since processing happens in your browser,
      you're only limited by your device's memory. Most modern devices
      can handle JSON files up to several megabytes.
    </p>
  </details>

  <details>
    <summary>Does it work offline?</summary>
    <p>
      Yes! Once the page loads, the tool works completely offline.
      You can even add CodeBox to your home screen as a PWA.
    </p>
  </details>
</section>
```

---

## Heading Hierarchy

Maintain proper H1-H6 structure:

```html
<h1>JSON Formatter & Validator</h1> <!-- Only one H1 per page -->
  <h2>How to Use</h2>
  <h2>Features</h2>
  <h2>Why Use JSON Formatter?</h2>
  <h2>Common Use Cases</h2>
  <h2>FAQ</h2>
    <h3>Is my data safe?</h3>
    <h3>What's the file size limit?</h3>
```

---

## Internal Linking

Link to related tools and categories:

```html
<aside class="related-tools">
  <h3>Related Tools</h3>
  <ul>
    <li><a href="/tools/xml-formatter">XML Formatter</a></li>
    <li><a href="/tools/yaml-formatter">YAML Formatter</a></li>
    <li><a href="/tools/json-to-csv">JSON to CSV Converter</a></li>
  </ul>
</aside>
```

---

## Technical SEO

### 1. HTML Lang Attribute

```html
<html lang="en">
```

---

### 2. Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

### 3. Charset

```html
<meta charset="UTF-8">
```

---

### 4. Mobile-Friendly

- Responsive design (covered in Responsive Design doc)
- Touch-friendly buttons (44x44px minimum)
- No Flash or other deprecated technologies

---

### 5. HTTPS

Ensure site is served over HTTPS (Vercel/Netlify do this automatically)

---

### 6. Page Speed

Aim for:
- Mobile: 85+ Lighthouse score
- Desktop: 95+ Lighthouse score

---

### 7. Valid HTML

```bash
# Validate HTML
https://validator.w3.org/
```

---

## Content Guidelines

### 1. Keyword Density

- Primary keyword: 1-2% of total words
- Use variations and related terms
- Don't keyword stuff (looks spammy)

### 2. Content Length

- Homepage: 500-800 words
- Tool pages: 800-1200 words (with documentation)
- Category pages: 300-500 words
- Blog posts: 1500+ words

### 3. Readability

- Use short paragraphs (2-3 sentences)
- Use bullet points and numbered lists
- Use subheadings (H2, H3)
- Write in active voice
- Target Flesch Reading Ease: 60+ (8th grade level)

---

## Link Building Strategies

### 1. Developer Communities

- Share on Reddit (r/webdev, r/javascript, r/programming)
- Post on Hacker News
- Share on Dev.to
- Twitter / X (use hashtags: #webdev #javascript #devtools)
- Discord communities

### 2. Guest Posts

- Write tutorials using your tools
- Contribute to dev blogs
- Write on Medium/Dev.to

### 3. GitHub

- Open source the project
- Add to Awesome Lists (awesome-developer-tools)
- Create issues/PRs mentioning your tools

### 4. Product Hunt

- Launch on Product Hunt
- Prepare: screenshots, demo video, good description

---

## Analytics & Tracking

### Google Search Console

```html
<meta name="google-site-verification" content="your-verification-code">
```

Track:
- Impressions
- Clicks
- Average position
- Click-through rate (CTR)

---

### Plausible / Simple Analytics

Privacy-friendly analytics (better than Google Analytics):

```html
<script defer data-domain="codebox.dev" src="https://plausible.io/js/script.js"></script>
```

---

## Local SEO (Optional)

If you want to rank for "[your city] developer tools":

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CodeBox",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Your City",
    "addressRegion": "State",
    "addressCountry": "Country"
  }
}
</script>
```

---

## SEO Checklist

### On-Page SEO
- [ ] Unique, descriptive title tags (50-60 chars)
- [ ] Compelling meta descriptions (150-160 chars)
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Keyword in URL, title, H1, first paragraph
- [ ] Internal linking to related tools
- [ ] Alt text for all images
- [ ] Mobile-friendly design
- [ ] Fast page load (< 3s)

### Technical SEO
- [ ] HTTPS enabled
- [ ] Sitemap.xml created and submitted
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Schema.org structured data
- [ ] Open Graph tags for social sharing
- [ ] Valid HTML (no errors)
- [ ] No broken links (404s)

### Content SEO
- [ ] Original, valuable content (800+ words per tool)
- [ ] FAQ section answering common questions
- [ ] Use cases and examples
- [ ] Regular updates (blog, changelog)

### Off-Page SEO
- [ ] Share on social media
- [ ] Submit to directories (AlternativeTo, etc.)
- [ ] Launch on Product Hunt
- [ ] Open source on GitHub
- [ ] Get backlinks from developer blogs

---

## Monitoring & Reporting

Track these metrics weekly:
- Organic traffic (Google Search Console)
- Top performing keywords
- Average position in search results
- Click-through rate (CTR)
- Bounce rate
- Time on page

**Target Goals** (6 months):
- 10,000+ monthly organic visitors
- Top 3 ranking for primary keywords
- 50+ referring domains
- 5% organic CTR

---

## Resources

- [Google Search Console](https://search.google.com/search-console)
- [Ahrefs Keyword Generator](https://ahrefs.com/keyword-generator)
- [Schema Markup Generator](https://technicalseo.com/tools/schema-markup-generator/)
- [Screaming Frog SEO Spider](https://www.screamingfrogcom/)
