import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Sora', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        brand: 'var(--color-brand)',
        'subtle-bg': 'var(--color-subtle-bg)',
        'subtle-text': 'var(--color-subtle-text)',
      },
    },
  },
  plugins: [],
};