import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  safelist: ['bg-graphite'],
  theme: {
    extend: {
      colors: {
        graphite: '#2C2E30',
        obsidian: '#0E0E0E',
        'lime-apple': '#B2DF28',
        steel: '#3B3D3F',
      },
    },
  },
  plugins: [],
} satisfies Config
