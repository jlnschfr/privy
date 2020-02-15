/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    fontFamily: {
      title: ['Noway', 'sans-serif']
    },
    extend: {
      colors: {
        pgray: {
          light: '#f7fafc',
          medium: '#e2e8f0',
          dark: '#a0aec0'
        },
        pblue: {
          light: '#90cdf4',
          medium: '#4299e1',
          dark: '#3182ce'
        }
      },
      spacing: {
        px: '1px',
        '0': '0',
        '1': '0.5rem',
        '2': '1rem',
        '3': '1.5rem',
        '4': '2rem',
        '5': '2.5rem',
        '6': '3rem',
        '7': '3.5rem',
        '8': '4rem',
        '9': '4.5rem',
        '10': '5rem'
      },
      inset: {
        '0': 0,
        '1/2': '50%'
      }
    }
  },
  variants: {},
  plugins: []
}
