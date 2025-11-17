# Tool Page Layout

## Structure (Side-by-Side)

```
┌──────────────────────────────────────────────────┐
│ Header (sticky)                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Tool Name + Breadcrumb                          │
│  Short description                               │
│                                                  │
├─────────────────────┬────────────────────────────┤
│                     │                            │
│  INPUT PANEL        │  OUTPUT PANEL              │
│  (50%)              │  (50%)                     │
│                     │                            │
│  [Textarea/Upload]  │  [Result Display]          │
│                     │                            │
│  [Options]          │  [Copy] [Download]         │
│                     │                            │
│  [Format] button    │                            │
│                     │                            │
└─────────────────────┴────────────────────────────┘
```

---

## Page Container

```css
.tool-page {
  min-height: 100vh;
  background: var(--bg-primary);
  padding-bottom: 64px;
}
```

---

## Tool Header Section

```css
.tool-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 32px;
}

.tool-header__breadcrumb {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--text-tertiary);
  margin-bottom: 16px;
}

.tool-header__breadcrumb a {
  color: var(--accent-primary);
  text-decoration: none;
}

.tool-header__breadcrumb a:hover {
  text-decoration: underline;
}

.tool-header__title {
  font-family: var(--font-mono);
  font-size: 36px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.tool-header__description {
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 800px;
}
```

### HTML Example

```html
<div class="tool-header">
  <div class="tool-header__breadcrumb">
    <a href="/">Home</a> / <a href="/tools/formatters">Code Formatters</a> / JSON Formatter
  </div>
  <h1 class="tool-header__title">JSON Formatter & Validator</h1>
  <p class="tool-header__description">
    Format, validate, and beautify JSON data with syntax highlighting.
    Paste your minified JSON and get readable output instantly.
  </p>
</div>
```

---

## Tool Panels (Side-by-Side)

```css
.tool-panels {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

/* Mobile: Stack vertically */
@media (max-width: 768px) {
  .tool-panels {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

---

## Input Panel

```css
.tool-panel {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 0px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 500px;
}

.tool-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.tool-panel__title {
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.tool-panel__actions {
  display: flex;
  gap: 8px;
}

/* Textarea for input */
.tool-panel__textarea {
  flex-grow: 1;
  min-height: 400px;
  /* Uses .input styles from component library */
}

/* Options section (if tool has settings) */
.tool-panel__options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
}

/* Action button (Convert, Format, etc.) */
.tool-panel__submit {
  /* Uses .btn-primary styles */
  width: 100%;
}
```

### HTML Example (JSON Formatter Input)

```html
<div class="tool-panel">
  <div class="tool-panel__header">
    <h3 class="tool-panel__title">INPUT</h3>
    <div class="tool-panel__actions">
      <button class="btn-icon" aria-label="Clear input">🗑️</button>
      <button class="btn-icon" aria-label="Paste from clipboard">📋</button>
    </div>
  </div>

  <textarea
    class="tool-panel__textarea"
    placeholder='{"name":"John","age":30}'
    spellcheck="false"
  ></textarea>

  <div class="tool-panel__options">
    <label>
      <input type="checkbox" checked> Validate JSON
    </label>
    <label>
      <select>
        <option>2 spaces</option>
        <option>4 spaces</option>
        <option>Tabs</option>
      </select>
      Indentation
    </label>
  </div>

  <button class="tool-panel__submit btn-primary">
    Format JSON
  </button>
</div>
```

---

## Output Panel

```css
.tool-panel--output {
  /* Same base as .tool-panel */
}

/* Output display (pre-formatted code) */
.tool-panel__output {
  flex-grow: 1;
  padding: 16px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: auto;
  overflow-y: auto;
  min-height: 400px;
  white-space: pre; /* Preserve formatting */
}

/* Syntax highlighting (if using a library like Prism.js) */
.tool-panel__output .token.keyword { color: var(--syntax-keyword); }
.tool-panel__output .token.string { color: var(--syntax-string); }
.tool-panel__output .token.number { color: var(--syntax-number); }
.tool-panel__output .token.comment { color: var(--syntax-comment); }

/* Empty state (before processing) */
.tool-panel__output--empty {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  font-style: italic;
}

/* Error state */
.tool-panel__output--error {
  color: var(--error);
}

/* Action buttons (Copy, Download) */
.tool-panel__output-actions {
  display: flex;
  gap: 12px;
}
```

### HTML Example (JSON Formatter Output)

```html
<div class="tool-panel tool-panel--output">
  <div class="tool-panel__header">
    <h3 class="tool-panel__title">OUTPUT</h3>
    <div class="tool-panel__actions">
      <button class="btn-icon" aria-label="Copy to clipboard">📄</button>
      <button class="btn-icon" aria-label="Download JSON">⬇️</button>
    </div>
  </div>

  <pre class="tool-panel__output"><code>{
  "name": "John",
  "age": 30,
  "city": "New York"
}</code></pre>

  <div class="tool-panel__output-actions">
    <button class="btn-secondary">Copy to Clipboard</button>
    <button class="btn-secondary">Download JSON</button>
  </div>
</div>
```

---

## Mobile Behavior

On mobile (< 768px):
- Panels stack vertically (Input on top, Output below)
- "Format" button triggers smooth scroll to output
- Output panel shows success animation when result appears
- Both panels full-width (no side-by-side)

---

## Tool Documentation Section (Below Panels)

For SEO and user help, add documentation below the tool:

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

  <h2>FAQ</h2>
  <details>
    <summary>Is my data safe?</summary>
    <p>Yes! All processing happens client-side. Your data never leaves your browser.</p>
  </details>

  <details>
    <summary>What's the file size limit?</summary>
    <p>No limit! Since it runs in your browser, you're only limited by your device memory.</p>
  </details>
</section>
```

### Styling

```css
.tool-documentation {
  max-width: 800px;
  margin: 64px auto;
  padding: 0 24px;
  font-family: var(--font-sans);
  color: var(--text-secondary);
}

.tool-documentation h2 {
  font-family: var(--font-mono);
  font-size: 24px;
  color: var(--text-primary);
  margin: 32px 0 16px;
}

.tool-documentation ul,
.tool-documentation ol {
  margin-left: 24px;
  line-height: 1.8;
}

.tool-documentation details {
  margin: 16px 0;
  padding: 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
}

.tool-documentation summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--text-primary);
}

.tool-documentation summary:hover {
  color: var(--accent-primary);
}
```

---

## Tool Page Variants

### 1. Text Processing Tools
**Examples**: JSON Formatter, XML Formatter, Regex Tester

**Layout**: Side-by-side panels (Input | Output)

**Components**:
- Large textarea input
- Options panel (format settings)
- Live syntax highlighting in output
- Copy/Download buttons

---

### 2. Generator Tools
**Examples**: UUID Generator, Lorem Ipsum, Password Generator

**Layout**: Single panel (no split) with options on left, output on right

**Components**:
- Options/settings form
- Generate button
- Output display (read-only)
- Copy button
- Regenerate button

---

### 3. Conversion Tools
**Examples**: JSON to CSV, Base64 Encoder, Image Converter

**Layout**: Side-by-side panels with format selectors

**Components**:
- File upload or text input
- Format selector (from/to dropdowns)
- Convert button
- Download output button

---

### 4. Calculator/Utility Tools
**Examples**: Hash Generator, Color Picker, Timestamp Converter

**Layout**: Compact single panel with inputs and instant output

**Components**:
- Input field(s)
- Live updating output
- Copy button
- No explicit "Calculate" button (auto-calculates)

---

## Loading States for Tool Processing

```javascript
// When "Format" button clicked:

// 1. Button shows spinner (disable button)
button.disabled = true
button.innerHTML = '<span class="spinner spinner--sm"></span> Processing...'

// 2. Output panel shows skeleton screen
outputPanel.innerHTML = '<div class="skeleton skeleton--card"></div>'

// 3. After processing (instant for client-side):
//    - Skeleton fades out
//    - Result fades in with syntax highlighting
//    - Success toast appears
outputPanel.innerHTML = formattedResult
showToast('JSON formatted successfully!', 'success')

// 4. Re-enable button
button.disabled = false
button.innerHTML = 'Format JSON'
```

---

## Keyboard Shortcuts

Implement these for power users:

- **Cmd/Ctrl + Enter** → Execute tool (format/convert)
- **Cmd/Ctrl + C** → Copy output to clipboard
- **Escape** → Clear input/output
- **Tab** → Navigate between input/output

Show shortcuts in tooltips:
```html
<button title="Copy (Cmd+C)">Copy</button>
```

---

## Error Handling

### Validation Errors

```html
<div class="tool-panel__error">
  <div class="tool-panel__error-icon">⚠️</div>
  <div class="tool-panel__error-message">
    <strong>Invalid JSON</strong>
    <p>Unexpected token at line 3, column 12</p>
  </div>
</div>
```

### Styling

```css
.tool-panel__error {
  padding: 16px;
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid var(--error);
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.tool-panel__error-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.tool-panel__error-message strong {
  color: var(--error);
  font-family: var(--font-mono);
  display: block;
  margin-bottom: 4px;
}

.tool-panel__error-message p {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
}
```
