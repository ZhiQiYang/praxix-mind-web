/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  safelist: [
    // 確保這些關鍵類別不會被清除
    'bg-gradient-to-br',
    'from-blue-50',
    'via-indigo-50',
    'to-purple-50',
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'text-blue-600',
    'text-blue-700',
    'text-blue-200',
    'flex',
    'flex-col',
    'flex-grow',
    'min-h-screen'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            strong: {
              fontWeight: theme('fontWeight.bold'),
            },
            h1: {
              fontWeight: theme('fontWeight.bold'),
            },
            h2: {
              fontWeight: theme('fontWeight.bold'),
            },
            h3: {
              fontWeight: theme('fontWeight.bold'),
            },
            code: {
              color: theme('colors.gray.800'),
              backgroundColor: theme('colors.gray.100'),
              borderRadius: theme('borderRadius.md'),
              padding: `${theme('spacing.1')} ${theme('spacing.1.5')}`,
            },
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
              borderRadius: theme('borderRadius.md'),
              padding: theme('spacing.4'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ],
} 