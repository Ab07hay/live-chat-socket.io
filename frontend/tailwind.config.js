/* eslint-disable no-undef */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [ require('daisyui')],
  daisyui: {
    themes: [
      {
        'PI-css': {
          primary: '#1c4e80',
          'primary-focus': '#0d4073',
          'primary-content': '#ffffff',

          secondary: '#1c4e80',
          'secondary-focus': '#0d4073',
          'secondary-content': '#ffffff',

          accent: '#1c4e80',
          'accent-focus': '#0d4073',
          'accent-content': '#ffffff',

          neutral: '#3b424e',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',

          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#ced3d9',
          'base-content': '#0d4073',

          info: '#1c92f2',
          success: '#054822',
          warning: '#ff9900',
          error: '#ff3c00',

          '--rounded-box': '0.2rem',
          '--rounded-btn': '0.2rem',
          '--rounded-badge': '3rem',

          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '0.3rem',
          '--border-btn': '1px',
        },
      },
    ],
  },
}
