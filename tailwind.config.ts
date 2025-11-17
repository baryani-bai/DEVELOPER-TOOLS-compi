import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#000000',
          secondary: '#0a0a0a',
          tertiary: '#141414',
          hover: '#1a1a1a',
        },
        accent: {
          primary: '#00ff41',
          dim: '#00cc34',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a8a8a8',
          tertiary: '#6c6c6c',
          disabled: '#404040',
        },
        border: {
          primary: '#333333',
          secondary: '#1a1a1a',
          accent: '#00ff41',
        },
        success: '#00ff41',
        error: '#ff4444',
        warning: '#ffd93d',
        info: '#00d9ff',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
        '10': '80px',
        '12': '96px',
        '16': '128px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 255, 65, 0.2)',
        'glow-strong': '0 0 40px rgba(0, 255, 65, 0.4)',
      },
    },
  },
  plugins: [],
}
export default config
