import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a0e1a',
          800: '#0f1629',
          700: '#1a2340',
        },
        gold: {
          400: '#f5c842',
          500: '#e6b800',
        }
      }
    },
  },
  plugins: [],
}

export default config
