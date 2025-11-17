import { ComponentType } from 'react'

export interface ToolConfig {
  id: string
  name: string
  description: string
  category: string
  icon: string
  features: string[]
  keywords: string[]
  popular?: boolean
}

// Tool registry - This will be populated as we build each tool
export const toolRegistry: ToolConfig[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Format, validate, and beautify JSON with syntax highlighting. Detect errors with line numbers.',
    category: 'formatters',
    icon: '{ }',
    features: [
      'Syntax highlighting',
      'Error detection with line numbers',
      'Configurable indentation (2/4 spaces, tabs)',
      'Minify option',
      'Copy and download formatted JSON',
      '100% client-side processing',
    ],
    keywords: ['json', 'format', 'validate', 'beautify', 'minify', 'formatter'],
    popular: true,
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder & Decoder',
    description: 'Encode and decode Base64 strings instantly. Supports text and URL-safe encoding.',
    category: 'security',
    icon: '⇄',
    features: [
      'Encode text to Base64',
      'Decode Base64 to text',
      'URL-safe encoding option',
      'Error handling for invalid Base64',
      'Copy and download results',
      'Instant conversion',
    ],
    keywords: ['base64', 'encode', 'decode', 'encoder', 'decoder'],
    popular: true,
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder & Decoder',
    description: 'Encode and decode URL strings. Supports full URL and component encoding.',
    category: 'conversion',
    icon: '🔗',
    features: [
      'Encode URL components',
      'Decode URL-encoded strings',
      'Full URL vs component encoding',
      'Handle special characters',
      'Copy results instantly',
      'No server processing',
    ],
    keywords: ['url', 'encode', 'decode', 'percent', 'uri'],
    popular: true,
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique identifiers (UUID v4). Supports bulk generation and formatting options.',
    category: 'generators',
    icon: '🆔',
    features: [
      'Generate UUID v4 (random)',
      'Bulk generation (1-100 UUIDs)',
      'Uppercase/lowercase options',
      'Copy all UUIDs',
      'Download as text file',
      'Cryptographically secure',
    ],
    keywords: ['uuid', 'guid', 'generate', 'unique', 'identifier'],
    popular: true,
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for designs. Choose words, sentences, or paragraphs.',
    category: 'generators',
    icon: '📄',
    features: [
      'Generate words, sentences, or paragraphs',
      'Customizable count (1-100)',
      'Start with "Lorem ipsum" option',
      'Copy generated text',
      'Download as text file',
      'Classic Lorem Ipsum text',
    ],
    keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'generator', 'dummy'],
    popular: true,
  },
]

// Helper function to get tool by ID
export function getToolById(id: string): ToolConfig | undefined {
  return toolRegistry.find((tool) => tool.id === id)
}

// Helper function to get tools by category
export function getToolsByCategory(category: string): ToolConfig[] {
  return toolRegistry.filter((tool) => tool.category === category)
}

// Helper function to get popular tools
export function getPopularTools(): ToolConfig[] {
  return toolRegistry.filter((tool) => tool.popular)
}
