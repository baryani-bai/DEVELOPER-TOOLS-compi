# Component Library

## Buttons

### Primary Button (CTA)

```css
.btn-primary {
  background: var(--accent-primary);
  color: var(--bg-primary); /* Black text on green */
  padding: 16px 32px;
  border: none;
  border-radius: 0px; /* Sharp corners */
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease-out;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary:hover {
  background: var(--accent-primary-dim);
  box-shadow: var(--shadow-glow);
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-primary:focus {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Usage**: Main CTAs (hero button, "Use Tool", "Convert", "Generate")

---

### Secondary Button (Ghost)

```css
.btn-secondary {
  background: transparent;
  color: var(--accent-primary);
  padding: 16px 32px;
  border: 2px solid var(--accent-primary);
  border-radius: 0px;
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease-out;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-secondary:hover {
  background: var(--accent-primary);
  color: var(--bg-primary);
  box-shadow: var(--shadow-glow);
}

.btn-secondary:active {
  transform: scale(0.98);
}

.btn-secondary:focus {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

**Usage**: Secondary actions ("View All", "Learn More", "GitHub Star")

---

### Icon Button

```css
.btn-icon {
  background: transparent;
  color: var(--text-secondary);
  padding: 12px;
  border: 1px solid var(--border-primary);
  border-radius: 0px;
  cursor: pointer;
  transition: all 150ms ease-out;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-glow);
}

.btn-icon:active {
  transform: scale(0.95);
}
```

**Usage**: Copy button, download, close modal, etc.

---

## Inputs

### Text Input / Textarea

```css
.input {
  width: 100%;
  padding: 16px 20px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  border-radius: 0px;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.6;
  transition: all 150ms ease-out;
}

.input::placeholder {
  color: var(--text-tertiary);
  font-style: italic;
}

.input:hover {
  border-color: var(--border-accent);
}

.input:focus {
  outline: none;
  border: 2px solid var(--border-accent);
  box-shadow: var(--shadow-glow-strong);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--bg-secondary);
}

/* Error state */
.input.error {
  border-color: var(--error);
}

/* Success state */
.input.success {
  border-color: var(--success);
}
```

**Textarea variant**:
```css
.textarea {
  /* Same as .input */
  min-height: 200px;
  resize: vertical;
  font-family: var(--font-mono); /* Important for code input */
}
```

**Usage**: JSON input, code input, text manipulation tools

---

### File Upload (Drag & Drop Zone)

```css
.file-upload {
  width: 100%;
  min-height: 200px;
  padding: 32px;
  background: var(--bg-tertiary);
  border: 2px dashed var(--border-primary);
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.file-upload:hover,
.file-upload.drag-over {
  border-color: var(--accent-primary);
  background: var(--bg-hover);
  box-shadow: var(--shadow-glow);
}

.file-upload__icon {
  font-size: 48px;
  color: var(--text-tertiary);
  margin-bottom: 16px;
}

.file-upload__text {
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--text-secondary);
}

.file-upload__subtext {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--text-tertiary);
  margin-top: 8px;
}
```

**HTML Structure**:
```html
<div class="file-upload">
  <div class="file-upload__icon">📁</div>
  <div class="file-upload__text">Drop file here or click to browse</div>
  <div class="file-upload__subtext">Supports: .json, .xml, .csv (max 10MB)</div>
</div>
```

**Usage**: File conversion tools, image upload tools

---

### Dropdown/Select

```css
.select {
  width: 100%;
  padding: 16px 20px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  border-radius: 0px;
  font-family: var(--font-mono);
  font-size: 14px;
  cursor: pointer;
  appearance: none; /* Remove default arrow */
  background-image: url("data:image/svg+xml,..."); /* Custom arrow */
  background-repeat: no-repeat;
  background-position: right 16px center;
  transition: all 150ms ease-out;
}

.select:hover {
  border-color: var(--border-accent);
}

.select:focus {
  outline: none;
  border: 2px solid var(--border-accent);
  box-shadow: var(--shadow-glow-strong);
}
```

**Usage**: Hash algorithm selector, output format selector

---

## Cards

### Tool Card (Homepage Grid)

```css
.tool-card {
  width: 100%;
  height: 200px;
  padding: 24px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.tool-card:hover {
  border: 2px solid var(--accent-primary);
  box-shadow: var(--shadow-glow);
  transform: scale(1.02);
}

.tool-card__icon {
  font-size: 32px;
  color: var(--accent-primary);
  margin-bottom: 12px;
}

.tool-card__title {
  font-family: var(--font-mono);
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.tool-card__description {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  flex-grow: 1;
  /* Truncate to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tool-card__cta {
  /* Uses .btn-secondary styles */
  margin-top: 16px;
}
```

**HTML Structure**:
```html
<div class="tool-card">
  <div class="tool-card__icon">{ }</div>
  <h4 class="tool-card__title">JSON Formatter</h4>
  <p class="tool-card__description">Format and validate JSON with syntax highlighting</p>
  <button class="tool-card__cta btn-secondary">Use →</button>
</div>
```

---

### Category Card

```css
.category-card {
  width: 100%;
  min-height: 240px;
  padding: 32px;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: 0px;
  transition: all 200ms ease-out;
  cursor: pointer;
}

.category-card:hover {
  border: 2px solid var(--accent-primary);
  background: var(--bg-secondary);
  box-shadow: var(--shadow-glow);
}

.category-card__header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.category-card__icon {
  font-size: 48px;
}

.category-card__title {
  font-family: var(--font-mono);
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.category-card__count {
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--text-tertiary);
  margin-bottom: 16px;
}

.category-card__preview {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.category-card__preview li {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text-tertiary);
  line-height: 2;
}

.category-card__cta {
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--accent-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.category-card__cta:hover {
  text-decoration: underline;
}
```

---

## Modals / Dialogs

```css
/* Backdrop */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

/* Modal container */
.modal {
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  background: var(--bg-secondary);
  border: 2px solid var(--accent-primary);
  border-radius: 0px;
  padding: 32px;
  box-shadow: var(--shadow-glow-strong);
  overflow-y: auto;
  position: relative;
}

/* Close button (top-right) */
.modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  transition: all 150ms ease-out;
}

.modal__close:hover {
  color: var(--accent-primary);
}

/* Modal header */
.modal__header {
  font-family: var(--font-mono);
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 24px;
  padding-right: 40px; /* Space for close button */
}

/* Modal content */
.modal__content {
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
}
```

**Animation** (Framer Motion or CSS):
```css
/* Entrance animation */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal {
  animation: modalFadeIn 200ms ease-out;
}
```

**Usage**: Settings, help docs, confirmation dialogs

---

## Toast Notifications

```css
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  min-width: 300px;
  max-width: 400px;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 0px;
  box-shadow: var(--shadow-glow-strong);
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 2000;
  animation: toastSlideIn 200ms ease-out;
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Icon (left side) */
.toast__icon {
  font-size: 24px;
  flex-shrink: 0;
}

/* Message */
.toast__message {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--text-primary);
  flex-grow: 1;
}

/* Close button */
.toast__close {
  background: transparent;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  line-height: 1;
  flex-shrink: 0;
}

.toast__close:hover {
  color: var(--text-primary);
}

/* Variants */
.toast--success {
  border-left: 4px solid var(--success);
}

.toast--error {
  border-left: 4px solid var(--error);
}

.toast--warning {
  border-left: 4px solid var(--warning);
}

.toast--info {
  border-left: 4px solid var(--info);
}
```

**HTML Structure**:
```html
<div class="toast toast--success">
  <div class="toast__icon">✓</div>
  <div class="toast__message">JSON formatted successfully!</div>
  <button class="toast__close">×</button>
</div>
```

**Auto-dismiss**: 4 seconds (4000ms)

**Usage**: Success confirmations ("Copied to clipboard", "File converted"), error messages

---

## Loading States

### Spinner

```css
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-primary);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Small variant */
.spinner--sm {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

/* Large variant */
.spinner--lg {
  width: 60px;
  height: 60px;
  border-width: 4px;
}
```

**Usage**: Button loading states (inline), modal loading

---

### Skeleton Screen

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 0%,
    var(--bg-hover) 50%,
    var(--bg-secondary) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 0px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Variants for different content types */
.skeleton--text {
  height: 16px;
  width: 100%;
  margin-bottom: 8px;
}

.skeleton--title {
  height: 24px;
  width: 60%;
  margin-bottom: 16px;
}

.skeleton--card {
  height: 200px;
  width: 100%;
}
```

**Usage**: While tool page loads, while processing heavy operations

---

### Progress Bar

```css
.progress {
  width: 100%;
  height: 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 0px;
  overflow: hidden;
}

.progress__bar {
  height: 100%;
  background: var(--accent-primary);
  transition: width 300ms ease-out;
  box-shadow: var(--shadow-glow);
}

/* Indeterminate variant (for unknown duration) */
.progress__bar--indeterminate {
  width: 30%;
  animation: progressIndeterminate 1.5s infinite;
}

@keyframes progressIndeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}
```

**Usage**: File upload progress, batch processing

---

## Code Block

```css
.code-block {
  padding: 16px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 0px;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
  position: relative;
}

.code-block__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-primary);
  margin: -16px -16px 16px;
}

.code-block__language {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-tertiary);
  text-transform: uppercase;
}

.code-block__copy {
  /* Uses .btn-icon styles */
}

/* Syntax highlighting */
.code-block .token.keyword { color: var(--syntax-keyword); }
.code-block .token.string { color: var(--syntax-string); }
.code-block .token.number { color: var(--syntax-number); }
.code-block .token.function { color: var(--syntax-function); }
.code-block .token.comment { color: var(--syntax-comment); }
.code-block .token.operator { color: var(--syntax-operator); }
```

**Usage**: Output display for formatted code, documentation examples
