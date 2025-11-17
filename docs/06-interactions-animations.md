# Interactions & Animations

## Timing Standards

```css
:root {
  --duration-fast: 150ms;    /* Hover, color changes */
  --duration-normal: 200ms;  /* Dropdowns, modals */
  --duration-slow: 300ms;    /* Page transitions */

  --ease-out: cubic-bezier(0, 0, 0.2, 1);  /* Default */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);   /* Exit animations */
}
```

---

## Micro-interactions

### 1. Button Press

```css
.btn-primary:active {
  transform: scale(0.98);
  transition: transform 100ms ease-in;
}
```

**Effect**: Slight shrink on click, giving tactile feedback

---

### 2. Card Hover

```css
.tool-card:hover {
  transform: scale(1.02);
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-glow);
  transition: all 200ms var(--ease-out);
}
```

**Effect**: Card lifts slightly and glows on hover

---

### 3. Copy Button Click

```javascript
// When copy button clicked:
// 1. Button icon changes: 📄 → ✓
button.innerHTML = '✓'

// 2. Toast appears: "Copied to clipboard!"
showToast('Copied to clipboard!', 'success')

// 3. After 2s, icon reverts to 📄
setTimeout(() => {
  button.innerHTML = '📄'
}, 2000)
```

**Effect**: Visual confirmation of successful copy action

---

### 4. Tool Panel Processing

```javascript
// When "Format" button clicked:

// 1. Button shows spinner (disable button)
button.disabled = true
button.innerHTML = '<span class="spinner spinner--sm"></span> Processing...'

// 2. Output panel shows skeleton screen
outputPanel.classList.add('loading')

// 3. After processing (instant for client-side):
//    - Skeleton fades out
//    - Result fades in with syntax highlighting
//    - Success toast appears
outputPanel.classList.remove('loading')
outputPanel.classList.add('fade-in')
showToast('Formatted successfully!', 'success')
```

**Effect**: Clear feedback during processing

---

### 5. File Upload Drag-over

```css
.file-upload.drag-over {
  border-color: var(--accent-primary);
  background: var(--bg-hover);
  box-shadow: var(--shadow-glow);
  transform: scale(1.02);
  transition: all 200ms var(--ease-out);
}
```

**Effect**: Upload zone highlights when dragging file over it

---

### 6. Search Bar Focus (Header)

```css
.header-search:focus {
  width: 300px; /* Expands from 200px */
  transition: width 200ms var(--ease-out);
}
```

**Effect**: Search bar expands on focus for better visibility

---

## Page Transitions

Use **Framer Motion** for smooth page changes:

```javascript
// app/layout.tsx
import { motion, AnimatePresence } from 'framer-motion'

export default function RootLayout({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

**Effect**: Smooth fade + slide animation between pages

---

## Modal Animations

### Entrance

```css
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

### Exit

```css
@keyframes modalFadeOut {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
}

.modal.closing {
  animation: modalFadeOut 150ms ease-in forwards;
}
```

---

## Toast Notifications

### Slide In

```css
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

.toast {
  animation: toastSlideIn 200ms ease-out;
}
```

### Slide Out

```css
@keyframes toastSlideOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}

.toast.closing {
  animation: toastSlideOut 150ms ease-in forwards;
}
```

---

## Terminal Typing Animation (Hero Section)

```javascript
// Terminal content cycles
const cycles = [
  {
    command: '$ npx codebox format --json',
    output: '✓ JSON formatted successfully'
  },
  {
    command: '$ npx codebox hash --sha256 "my-password"',
    output: '✓ 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
  },
  {
    command: '$ npx codebox convert --csv-to-json data.csv',
    output: '✓ Converted 1,247 rows'
  }
]

let currentCycle = 0

function typeCommand(text, element, speed = 50) {
  let i = 0
  element.innerHTML = '$ '

  const interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text[i]
      i++
    } else {
      clearInterval(interval)
      element.innerHTML += ' █' // Blinking cursor
    }
  }, speed)
}

function runCycle() {
  const cycle = cycles[currentCycle]

  // Type command
  typeCommand(cycle.command, terminalElement)

  // Show output after delay
  setTimeout(() => {
    outputElement.innerHTML = cycle.output
  }, cycle.command.length * 50 + 500)

  // Move to next cycle
  currentCycle = (currentCycle + 1) % cycles.length

  // Repeat
  setTimeout(runCycle, 4000)
}

// Start animation
runCycle()
```

---

## Blinking Cursor

```css
.cursor {
  display: inline-block;
  width: 10px;
  height: 18px;
  background: var(--accent-primary);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}
```

**Usage**: Terminal cursor in hero section

---

## Loading Spinner Animation

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
```

---

## Skeleton Shimmer

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
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

---

## Glow Effect (Accent Elements)

```css
.glow {
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.2);
  transition: box-shadow 200ms ease-out;
}

.glow:hover {
  box-shadow: 0 0 40px rgba(0, 255, 65, 0.4);
}
```

**Usage**: Buttons, cards, focus states

---

## Fade In on Scroll

```javascript
// Using Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in')
    }
  })
}, {
  threshold: 0.1
})

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section)
})
```

```css
section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}

section.fade-in {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Keyboard Shortcuts

### Global Shortcuts

```javascript
document.addEventListener('keydown', (e) => {
  // Cmd/Ctrl + K: Open search
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    openSearch()
  }

  // Escape: Close modals/dropdowns
  if (e.key === 'Escape') {
    closeAllModals()
  }
})
```

### Tool Page Shortcuts

```javascript
// Cmd/Ctrl + Enter: Execute tool
if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
  e.preventDefault()
  formatButton.click()
}

// Cmd/Ctrl + C: Copy output (when focused)
if ((e.metaKey || e.ctrlKey) && e.key === 'c' && outputFocused) {
  e.preventDefault()
  copyToClipboard(output.textContent)
}
```

### Visual Shortcuts Indicator

```html
<button title="Copy (Cmd+C)">Copy</button>
```

Or show a keyboard shortcuts modal:

```html
<div class="shortcuts-modal">
  <h3>Keyboard Shortcuts</h3>
  <dl>
    <dt><kbd>Cmd</kbd> + <kbd>K</kbd></dt>
    <dd>Search tools</dd>

    <dt><kbd>Cmd</kbd> + <kbd>Enter</kbd></dt>
    <dd>Execute tool</dd>

    <dt><kbd>Cmd</kbd> + <kbd>C</kbd></dt>
    <dd>Copy output</dd>

    <dt><kbd>Esc</kbd></dt>
    <dd>Close modal</dd>
  </dl>
</div>
```

```css
kbd {
  display: inline-block;
  padding: 4px 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-primary);
}
```

---

## Focus States (Accessibility)

```css
*:focus {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

/* For elements with custom focus styles */
button:focus,
input:focus,
textarea:focus {
  outline: none;
  border: 2px solid var(--accent-primary);
  box-shadow: var(--shadow-glow-strong);
}
```

---

## Hover Effects Summary

| Element | Effect | Duration |
|---------|--------|----------|
| Buttons | Background color + glow | 150ms |
| Cards | Scale 1.02 + glow + border color | 200ms |
| Links | Color change + underline | 150ms |
| Icon buttons | Color + border + glow | 150ms |
| Search bar | Width expansion | 200ms |
| File upload zone | Scale + glow + background | 200ms |

---

## Animation Performance Tips

1. **Use `transform` and `opacity` only** (GPU accelerated)
   - ✅ `transform: scale(1.02)`
   - ❌ `width: 110%` (triggers reflow)

2. **Use `will-change` sparingly**
   ```css
   .tool-card {
     will-change: transform;
   }
   ```

3. **Debounce scroll animations**
   ```javascript
   const debounce = (func, wait) => {
     let timeout
     return (...args) => {
       clearTimeout(timeout)
       timeout = setTimeout(() => func(...args), wait)
     }
   }
   ```

4. **Reduce motion for accessibility**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
