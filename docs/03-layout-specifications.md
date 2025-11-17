# Layout Specifications

## Header Design

### Specifications

- **Height**: 72px (desktop), 64px (mobile)
- **Position**: Sticky (stays on scroll)
- **Background**: `rgba(0, 0, 0, 0.9)` with `backdrop-blur: 10px`
- **Border-bottom**: 1px solid var(--border-primary)
- **Z-index**: 100

---

### Desktop Layout (1024px+)

```
┌─────────────────────────────────────────────────────────┐
│  Logo         Navigation Links              Search  CTA │
│  [CB]    [Tools▼] [Docs] [About]           [🔍]   [⭐]  │
└─────────────────────────────────────────────────────────┘
   ↑            ↑                               ↑      ↑
 160px      Centered                         200px  120px
```

#### Components (Left to Right)

**1. Logo (Left, 160px width)**
- Text: `<CodeBox />` in monospace
- Color: --text-primary (white)
- Font-size: 24px, weight: 700
- Optional: Cursor | animation after text

**2. Navigation (Center, auto width)**
- **Tools** (dropdown mega-menu)
- **Docs** (link to documentation page)
- **About** (link to about page)
- Gap between items: 40px
- Font: --font-mono, 16px, weight: 500
- Color: --text-secondary (inactive), --accent-primary (hover/active)
- Underline animation on hover (2px thick, --accent-primary)

**3. Search Bar (Right, 200px width)**
- Icon: 🔍 (left side)
- Placeholder: "Search tools..."
- Background: --bg-tertiary
- Border: 1px solid --border-primary
- Hover: border-color: --border-accent
- Focus: Expands to 300px width (smooth transition 200ms)

**4. CTA Button (Right, 120px width)**
- Text: "GitHub" with ⭐ icon
- Style: Ghost button (border only)
- Links to GitHub repo
- Hover: border glows (--shadow-glow)

---

### Mobile Layout (< 768px)

```
┌──────────────────────────────────┐
│  ☰  <CodeBox />           [🔍]   │
└──────────────────────────────────┘
   ↑       ↑                  ↑
  44px  Centered            44px
```

- Hamburger menu (left)
- Logo (center)
- Search icon only (right, opens search overlay)
- Hamburger opens: Full-screen overlay menu

---

### Mega Menu (Tools Dropdown - Desktop)

```
┌──────────────────────────────────────────────────┐
│  📝 CODE FORMATTERS      🔐 HASH & SECURITY      │
│  • JSON Formatter        • MD5 Generator         │
│  • XML Formatter         • SHA-256 Generator     │
│  • HTML Beautifier       • Base64 Encoder        │
│  [View all 10 →]         [View all 10 →]         │
│                                                   │
│  🎯 REGEX & TEXT         📊 DATA CONVERSION      │
│  • Regex Tester          • JSON to CSV           │
│  • Text Diff             • XML to JSON           │
│  • Case Converter        • CSV to JSON           │
│  [View all 12 →]         [View all 10 →]         │
│                                                   │
│  [View All Tools →]                               │
└──────────────────────────────────────────────────┘
```

**Mega Menu Specs**:
- Width: 800px, centered under header
- Padding: 32px
- Background: --bg-secondary
- Border: 1px solid --border-primary
- Grid: 2 columns (4 categories shown, 2x2)
- Shows top 3 tools per category + "View all X" link
- Opens on hover (with 200ms delay to prevent accidental triggers)
- Smooth fade-in animation (200ms)

---

## Hero Section

### Concept: "Live Terminal Demo"

Make it interactive and useful, not just marketing fluff.

```
┌────────────────────────────────────────────────────┐
│                                                    │
│           <CodeBox /> - Dev Tools Suite            │
│     70+ free tools for developers. No BS.          │
│                                                    │
│   ┌────────────────────────────────────────────┐  │
│   │ $ npx codebox --help                       │  │
│   │                                            │  │
│   │ Available commands:                        │  │
│   │   format    Format code (JSON, XML, etc.)  │  │
│   │   hash      Generate hashes (MD5, SHA...)  │  │
│   │   convert   Convert data formats           │  │
│   │   encode    Encode/decode strings          │  │
│   │                                            │  │
│   │ $ _█                                       │  │
│   └────────────────────────────────────────────┘  │
│                                                    │
│   [Browse Tools →]  [Quick Search: JSON ▼]        │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Specifications

**Container**:
- Height: 500px (desktop), 400px (mobile)
- Padding: 80px top, 80px bottom
- Background: --bg-primary
- Text-align: center

**Headline**:
- Text: `<CodeBox />` in monospace
- Font-size: 64px (desktop), 40px (mobile)
- Weight: 700
- Color: --text-primary
- Margin-bottom: 16px

**Subheadline**:
- Text: "70+ free tools for developers. No BS."
- Font-size: 20px (desktop), 16px (mobile)
- Weight: 400
- Color: --text-secondary
- Font: --font-sans
- Margin-bottom: 48px

**Interactive Terminal Box**:
- Width: 700px max (desktop), 90% (mobile)
- Height: 300px
- Background: --bg-tertiary
- Border: 2px solid --border-primary
- Padding: 24px
- Font: --font-mono, 14px
- Color: --accent-primary (for commands), --text-secondary (for output)
- Interactive feature: Typing animation shows different commands every 4 seconds
- Blinking cursor at end: █

**Terminal Content** (cycling animation):

Cycle 1:
```
$ npx codebox format --json
✓ JSON formatted successfully
```

Cycle 2:
```
$ npx codebox hash --sha256 "my-password"
✓ 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
```

Cycle 3:
```
$ npx codebox convert --csv-to-json data.csv
✓ Converted 1,247 rows
```

(Then loops back to Cycle 1)

**CTA Buttons** (below terminal):

**Primary**: "Browse Tools →"
- Background: --accent-primary
- Text: --bg-primary (black on green)
- Padding: 16px 32px
- Font-size: 16px, weight: 600
- Border: none
- Hover: background dims slightly (--accent-primary-dim)

**Secondary**: "Quick Search: JSON ▼" (dropdown)
- Border: 2px solid --accent-primary
- Background: transparent
- Text: --accent-primary
- Padding: 16px 32px
- Hover: background: --accent-primary (inverted)

---

## Popular Tools Section

```
┌───────────────────────────────────────────────────┐
│                                                   │
│  ⚡ MOST USED TOOLS                               │
│                                                   │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────┐│
│  │ JSON    │  │ Base64  │  │ Regex   │  │ Hash ││
│  │ Format  │  │ Encode  │  │ Tester  │  │ Gen  ││
│  │         │  │         │  │         │  │      ││
│  │ [Use →] │  │ [Use →] │  │ [Use →] │  │[Use→]││
│  └─────────┘  └─────────┘  └─────────┘  └──────┘│
│                                                   │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────┐│
│  │ MD to   │  │ Color   │  │ UUID    │  │ Diff ││
│  │ HTML    │  │ Picker  │  │ Gen     │  │Check ││
│  │         │  │         │  │         │  │      ││
│  │ [Use →] │  │ [Use →] │  │ [Use →] │  │[Use→]││
│  └─────────┘  └─────────┘  └─────────┘  └──────┘│
│                                                   │
│                  [View All Tools →]               │
│                                                   │
└───────────────────────────────────────────────────┘
```

### Specifications

**Section Container**:
- Padding: 96px top, 96px bottom
- Background: --bg-primary
- Max-width: 1200px, centered

**Section Header**:
- Text: "⚡ MOST USED TOOLS" (emoji + text)
- Font-size: 36px
- Weight: 700
- Font: --font-mono
- Color: --text-primary
- Margin-bottom: 48px
- Text-align: center

**Tool Card Grid**:
- Grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Gap: 24px
- Shows: 8 tools total (2 rows of 4)

**Tool Card**:
- Width: Auto (fills grid cell)
- Height: 200px (fixed)
- Padding: 24px
- Background: --bg-secondary
- Border: 1px solid --border-primary
- Display: flex, flex-direction: column, justify-content: space-between

**Card Contents**:
1. Icon Area (top, 40px height)
   - Tool-specific icon (e.g., {} for JSON, # for hash)
   - Font-size: 32px
   - Color: --accent-primary

2. Tool Name (middle)
   - Font-size: 20px
   - Weight: 600
   - Font: --font-mono
   - Color: --text-primary
   - Margin-top: 16px

3. Description (middle, flexible height)
   - Font-size: 14px
   - Weight: 400
   - Font: --font-sans
   - Color: --text-secondary
   - Line-height: 1.5
   - Max 2 lines, overflow: hidden

4. CTA Button (bottom)
   - Text: "Use →"
   - Full-width button
   - Background: transparent
   - Border: 1px solid --accent-primary
   - Color: --accent-primary
   - Padding: 12px
   - Font-size: 14px
   - Hover: background: --accent-primary, color: --bg-primary

**Card Hover State**:
- Border changes to: 2px solid --accent-primary
- Box-shadow: --shadow-glow
- Scale: 1.02 (subtle lift)
- Transition: all 200ms ease-out

**Recommended Tools to Show**:
1. JSON Formatter
2. Base64 Encoder
3. Regex Tester
4. Hash Generator (SHA-256)
5. Markdown to HTML
6. Color Picker
7. UUID Generator
8. Text Diff Checker

---

## Categories Section

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  🗂️ BROWSE BY CATEGORY                           │
│                                                  │
│  ┌──────────────┐  ┌──────────────┐             │
│  │ 📝 CODE      │  │ 🔐 HASH &    │             │
│  │ FORMATTERS   │  │ SECURITY     │             │
│  │              │  │              │             │
│  │ 10 tools     │  │ 10 tools     │             │
│  │ [Explore →]  │  │ [Explore →]  │             │
│  └──────────────┘  └──────────────┘             │
│                                                  │
│  ┌──────────────┐  ┌──────────────┐             │
│  │ 🎯 REGEX &   │  │ 📊 DATA      │             │
│  │ TEXT         │  │ CONVERSION   │             │
│  │              │  │              │             │
│  │ 12 tools     │  │ 10 tools     │             │
│  │ [Explore →]  │  │ [Explore →]  │             │
│  └──────────────┘  └──────────────┘             │
│                                                  │
│  (... 4 more category cards)                     │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Specifications

**Section Container**:
- Padding: 96px top, 96px bottom
- Background: --bg-secondary (slightly different from hero/tools sections)
- Max-width: 1200px, centered

**Section Header**:
- Text: "🗂️ BROWSE BY CATEGORY"
- Font-size: 36px
- Weight: 700
- Font: --font-mono
- Color: --text-primary
- Margin-bottom: 48px
- Text-align: center

**Category Card Grid**:
- Grid: 2 columns (desktop), 1 column (mobile)
- Gap: 32px
- Shows: All 8 categories

**Category Card**:
- Width: Auto (fills grid cell)
- Height: 240px
- Padding: 32px
- Background: --bg-primary (inverted from section bg)
- Border: 1px solid --border-primary

**Card Contents**:
1. Icon + Category Name (top)
   - Emoji icon: 48px size (or use SVG icons)
   - Category name below icon
   - Font-size: 24px
   - Weight: 700
   - Font: --font-mono
   - Color: --text-primary
   - Margin-bottom: 16px

2. Tool Count (middle)
   - Text: "X tools"
   - Font-size: 16px
   - Font: --font-sans
   - Color: --text-tertiary
   - Margin-bottom: 24px

3. Sample Tool Names (middle, optional)
   - List 3 tool names in small text
   - Font-size: 13px
   - Color: --text-tertiary
   - Gives preview of what's inside

4. CTA Link (bottom)
   - Text: "Explore →"
   - Color: --accent-primary
   - Font-size: 16px
   - Font: --font-mono
   - No button styling, just text link with arrow
   - Hover: Underline appears

**Card Hover State**:
- Border: 2px solid --accent-primary
- Background: --bg-secondary (lighter)
- Slight glow: --shadow-glow
- Transition: all 200ms ease-out

**8 Categories**:
1. 📝 Code Formatters & Validators (10 tools)
2. 🔐 Hash, Encryption & Security (10 tools)
3. 🎯 Regex & Text Manipulation (12 tools)
4. 📊 Data Conversion & Transformation (10 tools)
5. 🌐 API & Web Development (9 tools)
6. 🎨 CSS & Design Generators (7 tools)
7. 🔢 Number & Time Utilities (6 tools)
8. 📦 Code & File Generators (8 tools)

---

## Values/Features Section

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  WHY CODEBOX?                                    │
│                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │ ⚡ FAST  │    │ 🔒 SAFE  │    │ 🆓 FREE  │  │
│  │          │    │          │    │          │  │
│  │ Client-  │    │ No data  │    │ Zero BS. │  │
│  │ side     │    │ sent to  │    │ Forever  │  │
│  │ only     │    │ servers  │    │ free     │  │
│  └──────────┘    └──────────┘    └──────────┘  │
│                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │ 🎯 FOCUS │    │ 🌙 DARK  │    │ 🚀 FAST  │  │
│  │          │    │          │    │          │  │
│  │ 70 tools │    │ Easy on  │    │ No sign  │  │
│  │ no fluff │    │ the eyes │    │ up wall  │  │
│  └──────────┘    └──────────┘    └──────────┘  │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Specifications

**Section Container**:
- Padding: 96px top, 96px bottom
- Background: --bg-primary
- Max-width: 1200px, centered

**Section Header**:
- Text: "WHY CODEBOX?"
- Font-size: 36px
- Weight: 700
- Font: --font-mono
- Color: --text-primary
- Margin-bottom: 64px
- Text-align: center

**Feature Grid**:
- Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Gap: 40px
- Shows: 6 value propositions

**Feature Card**:
- Width: Auto (fills grid cell)
- Padding: 32px
- Background: transparent (no card background - minimal design)
- Border: 1px solid --border-secondary (very subtle)
- Text-align: center

**Card Contents**:
1. Icon (top)
   - Emoji or simple SVG icon
   - Font-size: 48px
   - Margin-bottom: 24px

2. Feature Title
   - Font-size: 20px
   - Weight: 700
   - Font: --font-mono
   - Color: --accent-primary (stands out)
   - Margin-bottom: 12px

3. Feature Description
   - Font-size: 14px
   - Font: --font-sans
   - Color: --text-secondary
   - Line-height: 1.6
   - Max-width: 200px (centered in card)

**6 Values**:
1. ⚡ Lightning Fast - "Client-side processing means instant results. No server delays."
2. 🔒 Privacy First - "Your data never leaves your browser. We don't store anything."
3. 🆓 Forever Free - "No premium tiers, no paywalls. All 70 tools, completely free."
4. 🎯 Zero Bloat - "Just tools. No trackers, no ads, no annoying popups."
5. 🌙 Dark Mode Native - "Built for developers who work at night. Easy on the eyes."
6. 🚀 No Barriers - "No signup required. Paste, convert, done. That's it."

---

## Footer Design

```
┌──────────────────────────────────────────────────┐
│  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │ TOOLS      │  │ RESOURCES  │  │ CONNECT    │ │
│  │            │  │            │  │            │ │
│  │ Formatters │  │ Docs       │  │ GitHub     │ │
│  │ Converters │  │ Blog       │  │ Twitter    │ │
│  │ Generators │  │ Changelog  │  │ Discord    │ │
│  │ All Tools  │  │ API        │  │ Email      │ │
│  └────────────┘  └────────────┘  └────────────┘ │
│                                                  │
│  ────────────────────────────────────────────── │
│                                                  │
│  Built by [Your Name] • MIT Licensed            │
│  Made with Next.js • Open Source                │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Specifications

**Footer Container**:
- Padding: 64px top, 32px bottom
- Background: --bg-secondary
- Border-top: 1px solid --border-primary

**Top Section** (3-column layout):
- Grid: 3 columns (desktop), 1 column (mobile)
- Gap: 64px
- Max-width: 1200px, centered

**Column Header**:
- Font-size: 14px
- Weight: 600
- Font: --font-mono
- Color: --accent-primary
- Text-transform: uppercase
- Letter-spacing: 1px
- Margin-bottom: 20px

**Column Links**:
- Font-size: 14px
- Font: --font-sans
- Color: --text-tertiary
- Line-height: 2 (32px) - generous spacing
- Hover: color: --accent-primary, underline

**Column 1: TOOLS**
- Formatters (link to category)
- Converters (link to category)
- Generators (link to category)
- Security Tools (link to category)
- All Tools (link to full tool list)

**Column 2: RESOURCES**
- Documentation (how to use each tool)
- Blog (optional - dev tips, updates)
- Changelog (version history)
- API (if you offer programmatic access)

**Column 3: CONNECT**
- GitHub (link to repo)
- Twitter (your dev twitter)
- Discord (community server - optional)
- Email (contact/feedback)

**Bottom Section** (copyright/credits):
- Border-top: 1px solid --border-secondary
- Padding-top: 32px
- Margin-top: 32px
- Text-align: center
- Text: "Built by [Your Name] • MIT Licensed"
- "Made with Next.js • Open Source"
- Font-size: 13px
- Color: --text-tertiary
- Font: --font-sans
- Line-height: 1.8
