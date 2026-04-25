/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        torch: {
          50: '#f8e8c8',
          100: '#e8c34a',
          200: '#c97a2b',
          400: '#8a4a1a',
          700: '#3a1f0d',
          900: '#1a0e06',
        },
        hud: {
          gold: '#e8c34a',
          ember: '#c97a2b',
          night: '#0d0a07',
          stone: '#3a1f0d',
        },
      },
      fontFamily: {
        rune: ['"Cinzel"', 'serif'],
        body: ['"IM Fell English"', 'serif'],
        pixel: ['"VT323"', 'monospace'],
        hand: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'hud': 'inset 0 0 0 4px #1a0e06, inset 0 0 0 8px #e8c34a, inset 0 0 0 12px #1a0e06',
      },
    },
  },
  plugins: [],
}
