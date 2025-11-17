# Accessibility Requirements (WCAG AA Compliance)

## Color Contrast

### WCAG AA Requirements
- Normal text (< 18px): Minimum 4.5:1 contrast ratio
- Large text (≥ 18px): Minimum 3:1 contrast ratio
- **WCAG AAA** (target): 7:1 for normal text, 4.5:1 for large text

### CodeBox Color Contrast Ratios

✅ **White on Black** (#ffffff on #000000)
- Contrast: **21:1** (AAA - Perfect!)
- Usage: Headings, primary text

✅ **Neon Green on Black** (#00ff41 on #000000)
- Contrast: **15:1** (AAA - Excellent!)
- Usage: Accent elements, CTAs

✅ **Light Gray on Black** (#a8a8a8 on #000000)
- Contrast: **9:1** (AAA)
- Usage: Body text, descriptions

✅ **Mid Gray on Black** (#6c6c6c on #000000)
- Contrast: **5.5:1** (AA - Pass)
- Usage: Captions, labels, tertiary text

✅ **Black on Neon Green** (#000000 on #00ff41)
- Contrast: **15:1** (AAA - Excellent!)
- Usage: Primary button text

---

## Semantic HTML

Use proper HTML5 semantic elements:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CodeBox - Developer Tools</title>
</head>
<body>
  <header>
    <nav>
      <!-- Navigation -->
    </nav>
  </header>

  <main>
    <section>
      <h1>Page Title</h1>
      <!-- Content -->
    </section>

    <section>
      <h2>Section Title</h2>
      <!-- Content -->
    </section>
  </main>

  <footer>
    <!-- Footer content -->
  </footer>
</body>
</html>
```

### Semantic Element Usage

| Element | Purpose |
|---------|---------|
| `<header>` | Page header with logo and navigation |
| `<nav>` | Navigation menus |
| `<main>` | Primary page content |
| `<section>` | Thematic grouping of content |
| `<article>` | Self-contained content (blog posts, tool pages) |
| `<aside>` | Sidebar content, related links |
| `<footer>` | Page footer |
| `<button>` | Interactive buttons (not `<div>` styled as button) |
| `<a>` | Links to other pages |

---

## Keyboard Navigation

### Requirements

1. **All interactive elements** must be keyboard accessible
2. **Tab order** must be logical (top to bottom, left to right)
3. **Focus states** must be clearly visible
4. **Skip links** for keyboard users

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Tab** | Navigate to next interactive element |
| **Shift + Tab** | Navigate to previous element |
| **Enter** / **Space** | Activate button or link |
| **Escape** | Close modal or dropdown |
| **Cmd/Ctrl + K** | Open search |
| **Cmd/Ctrl + Enter** | Execute tool (on tool pages) |
| **Arrow keys** | Navigate within dropdowns/menus |

### Implementation

```javascript
// Tab order management
const focusableElements = document.querySelectorAll(
  'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
)

// Trap focus in modal
function trapFocus(modal) {
  const focusable = modal.querySelectorAll('a, button, input')
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  })
}
```

---

## Focus States

### Visible Focus Indicator

```css
*:focus {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

/* Never use outline: none without replacement! */
```

### Custom Focus Styles

```css
button:focus,
input:focus,
textarea:focus,
select:focus {
  outline: none; /* Remove default */
  border: 2px solid var(--accent-primary);
  box-shadow: 0 0 40px rgba(0, 255, 65, 0.4);
}

a:focus {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
  text-decoration: underline;
}
```

### Skip to Main Content Link

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<main id="main-content">
  <!-- Page content -->
</main>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent-primary);
  color: var(--bg-primary);
  padding: 12px 16px;
  font-family: var(--font-mono);
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 0;
}
```

---

## ARIA Labels & Attributes

### Button Labels

```html
<!-- Icon-only buttons need labels -->
<button aria-label="Copy to clipboard">
  📄
</button>

<button aria-label="Close modal">
  ×
</button>

<button aria-label="Search">
  🔍
</button>
```

### Form Labels

```html
<!-- Always use labels with inputs -->
<label for="json-input">JSON Input</label>
<textarea id="json-input" name="json-input"></textarea>

<!-- Or use aria-label if visual label is hidden -->
<input
  type="search"
  aria-label="Search tools"
  placeholder="Search..."
/>
```

### Live Regions

For dynamic content updates:

```html
<!-- Success message -->
<div role="status" aria-live="polite">
  JSON formatted successfully!
</div>

<!-- Error message -->
<div role="alert" aria-live="assertive">
  Invalid JSON syntax at line 3
</div>
```

### Expandable Sections

```html
<button
  aria-expanded="false"
  aria-controls="tools-menu"
  @click="toggleMenu"
>
  Tools ▼
</button>

<div id="tools-menu" aria-hidden="true">
  <!-- Menu content -->
</div>
```

### Modals

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Settings</h2>
  <p id="modal-description">Configure your preferences</p>

  <button aria-label="Close modal">×</button>
</div>
```

### Loading States

```html
<button aria-busy="true" disabled>
  <span class="spinner" aria-hidden="true"></span>
  Loading...
</button>
```

---

## Alt Text for Images

```html
<!-- Functional images (convey information) -->
<img src="logo.svg" alt="CodeBox - Developer Tools Suite">

<!-- Decorative images (no information) -->
<img src="background.png" alt="" role="presentation">

<!-- Complex images (charts, diagrams) -->
<img
  src="chart.png"
  alt="Bar chart showing tool usage: JSON Formatter 45%, Base64 Encoder 30%, Regex Tester 25%"
>
```

### Emoji Accessibility

```html
<!-- Decorative emoji -->
<span role="img" aria-label="Lightning bolt">⚡</span>

<!-- Or hide from screen readers if purely decorative -->
<span aria-hidden="true">⚡</span>
<span class="sr-only">Fast</span>
```

---

## Error Handling & Validation

### Form Validation

```html
<!-- Invalid input -->
<input
  type="text"
  aria-invalid="true"
  aria-describedby="error-message"
/>
<span id="error-message" role="alert">
  Please enter valid JSON
</span>
```

### Error Messages

```html
<div class="error-message" role="alert">
  <strong>Error:</strong> Invalid JSON syntax
  <p>Unexpected token at line 3, column 12</p>
</div>
```

---

## Screen Reader Only Text

For text that should be read by screen readers but not visible:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

Usage:
```html
<button>
  <span class="sr-only">Copy to clipboard</span>
  <span aria-hidden="true">📄</span>
</button>
```

---

## Reduced Motion

Respect user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Color Blindness Considerations

### Don't Rely on Color Alone

❌ **Bad**: Only using red/green for error/success
```html
<span style="color: red;">Error</span>
<span style="color: green;">Success</span>
```

✅ **Good**: Use icons + color
```html
<span class="error">
  <span role="img" aria-label="Error">❌</span> Error
</span>
<span class="success">
  <span role="img" aria-label="Success">✓</span> Success
</span>
```

### Test with Color Blindness Simulators

- Chrome DevTools > Rendering > Emulate vision deficiencies
- Test for: Protanopia, Deuteranopia, Tritanopia, Achromatopsia

---

## Touch Targets (Mobile)

Minimum **44x44px** for all interactive elements:

```css
button,
a,
input,
select {
  min-height: 44px;
  min-width: 44px;
}
```

---

## Headings Hierarchy

Maintain proper heading order:

```html
<h1>CodeBox - Developer Tools</h1>
  <h2>Most Used Tools</h2>
    <h3>JSON Formatter</h3>
  <h2>Browse by Category</h2>
    <h3>Code Formatters</h3>
```

❌ **Bad**: Skipping levels (h1 → h3)
✅ **Good**: Sequential (h1 → h2 → h3)

---

## Accessible Forms

### Required Fields

```html
<label for="email">
  Email <span aria-label="required">*</span>
</label>
<input
  id="email"
  type="email"
  required
  aria-required="true"
/>
```

### Field Instructions

```html
<label for="password">Password</label>
<input
  id="password"
  type="password"
  aria-describedby="password-hint"
/>
<span id="password-hint">
  Must be at least 8 characters
</span>
```

### Checkbox Groups

```html
<fieldset>
  <legend>Output Options</legend>
  <label>
    <input type="checkbox" name="validate" checked />
    Validate JSON
  </label>
  <label>
    <input type="checkbox" name="minify" />
    Minify output
  </label>
</fieldset>
```

---

## Accessible Dropdowns

```html
<button
  id="dropdown-button"
  aria-expanded="false"
  aria-haspopup="true"
  aria-controls="dropdown-menu"
>
  Tools ▼
</button>

<ul id="dropdown-menu" role="menu" aria-labelledby="dropdown-button">
  <li role="menuitem"><a href="/json-formatter">JSON Formatter</a></li>
  <li role="menuitem"><a href="/base64-encoder">Base64 Encoder</a></li>
</ul>
```

---

## Accessible Tables

```html
<table>
  <caption>Tool Usage Statistics</caption>
  <thead>
    <tr>
      <th scope="col">Tool Name</th>
      <th scope="col">Usage Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>JSON Formatter</td>
      <td>1,234</td>
    </tr>
  </tbody>
</table>
```

---

## Testing Tools

### Automated Testing
- **Lighthouse** (Chrome DevTools)
- **axe DevTools** (Browser extension)
- **WAVE** (Web Accessibility Evaluation Tool)
- **Pa11y** (Command-line tool)

### Manual Testing
- Navigate entire site using **only keyboard**
- Test with **screen reader** (NVDA, JAWS, VoiceOver)
- Test with **high contrast mode**
- Test with **browser zoom** at 200%

### Screen Readers
- **Windows**: NVDA (free), JAWS
- **Mac**: VoiceOver (built-in, Cmd+F5)
- **Linux**: Orca
- **Mobile**: iOS VoiceOver, Android TalkBack

---

## Accessibility Checklist

### Perceivable
- [ ] All text has sufficient contrast (4.5:1 minimum)
- [ ] All images have alt text
- [ ] Content is not conveyed by color alone
- [ ] Text can be resized to 200% without loss of functionality

### Operable
- [ ] All functionality available via keyboard
- [ ] No keyboard traps
- [ ] Focus order is logical
- [ ] Focus indicator is visible
- [ ] Skip navigation link is present
- [ ] Timing is not essential (or user can extend time)

### Understandable
- [ ] Language is declared (`<html lang="en">`)
- [ ] Navigation is consistent across pages
- [ ] Form labels and instructions are clear
- [ ] Error messages are descriptive
- [ ] Headings hierarchy is logical

### Robust
- [ ] Valid HTML5
- [ ] ARIA attributes used correctly
- [ ] Works with assistive technologies
- [ ] Works across browsers

---

## WCAG 2.1 Level AA Compliance

Target: **100% WCAG 2.1 Level AA**

Key principles:
1. **Perceivable**: Information and UI components must be presentable to users
2. **Operable**: UI components and navigation must be operable
3. **Understandable**: Information and operation of UI must be understandable
4. **Robust**: Content must be robust enough to be interpreted by a wide variety of user agents

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
