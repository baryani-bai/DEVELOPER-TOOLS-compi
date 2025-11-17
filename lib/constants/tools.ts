export interface Tool {
  id: string
  name: string
  description: string
  category: string
  icon: string
  popular?: boolean
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  toolCount: number
  color: string
}

// Popular tools to show on homepage
export const popularTools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON with syntax highlighting',
    category: 'formatters',
    icon: '{ }',
    popular: true,
    featured: true,
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder',
    description: 'Encode and decode Base64 strings instantly',
    category: 'security',
    icon: '⇄',
    popular: true,
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions with live matching',
    category: 'text',
    icon: '.*',
    popular: true,
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-256, SHA-512 hashes',
    category: 'security',
    icon: '#',
    popular: true,
  },
  {
    id: 'markdown-html',
    name: 'Markdown to HTML',
    description: 'Convert Markdown to HTML instantly',
    category: 'conversion',
    icon: '#→',
    popular: true,
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors and convert HEX, RGB, HSL',
    category: 'css',
    icon: '🎨',
    popular: true,
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique identifiers (UUID v4)',
    category: 'generators',
    icon: '🆔',
    popular: true,
  },
  {
    id: 'text-diff',
    name: 'Text Diff Checker',
    description: 'Compare two text blocks side-by-side',
    category: 'text',
    icon: '≠',
    popular: true,
  },
]

// All categories
export const categories: Category[] = [
  {
    id: 'formatters',
    name: 'Code Formatters & Validators',
    description: 'Format, beautify, and validate code in various languages',
    icon: '📝',
    toolCount: 10,
    color: '#00ff41',
  },
  {
    id: 'security',
    name: 'Hash, Encryption & Security',
    description: 'Generate hashes, encode/decode, encrypt/decrypt data',
    icon: '🔐',
    toolCount: 10,
    color: '#ff6b6b',
  },
  {
    id: 'text',
    name: 'Regex & Text Manipulation',
    description: 'Test regex patterns, manipulate text, compare diffs',
    icon: '🎯',
    toolCount: 12,
    color: '#ffd93d',
  },
  {
    id: 'conversion',
    name: 'Data Conversion & Transformation',
    description: 'Convert between data formats (JSON, XML, CSV, YAML)',
    icon: '📊',
    toolCount: 10,
    color: '#4ecdc4',
  },
  {
    id: 'api',
    name: 'API & Web Development',
    description: 'HTTP clients, URL encoding, JWT tools, webhook testers',
    icon: '🌐',
    toolCount: 9,
    color: '#00d9ff',
  },
  {
    id: 'css',
    name: 'CSS & Design Generators',
    description: 'Color pickers, gradient generators, shadow generators',
    icon: '🎨',
    toolCount: 7,
    color: '#a8dadc',
  },
  {
    id: 'utilities',
    name: 'Number & Time Utilities',
    description: 'Unit converters, timestamp tools, number base converters',
    icon: '🔢',
    toolCount: 6,
    color: '#6bcf7f',
  },
  {
    id: 'generators',
    name: 'Code & File Generators',
    description: 'UUID generators, Lorem Ipsum, fake data generators',
    icon: '📦',
    toolCount: 8,
    color: '#ff9ff3',
  },
]
