/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        'ar-display': ['"IBM Plex Sans Arabic"', 'serif'],
      },
      colors: {
        paper: '#F5F1EC',
        ink: '#1A1614',
        muted: '#8A7F75',
        rule: '#E5DDD3',
        accent: {
          DEFAULT: '#E84A8A',
          soft: '#FFE4ED',
          dark: '#D03872',
        },
      },
      letterSpacing: {
        logo: '0.2em',
        meta: '0.15em',
        wide: '0.05em',
      },
      maxWidth: {
        page: '1440px',
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
