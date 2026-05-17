import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        parchment:  '#F5E6C8',
        'wh-brown': '#3D1F00',
        'wh-mid':   '#8B5E3C',
        'wh-gold':  '#C9A84C',
        'wh-red':   '#8B0000',
        'wh-green': '#2D5A1B',
        'wh-text':  '#1A0A00',
      },
      fontFamily: {
        medieval: ['Cinzel', 'serif'],
        body:     ['Crimson Text', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
