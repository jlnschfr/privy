/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    fontFamily: {
      body: ['Nunito', 'sans-serif']
    },
    extend: {
      colors: {
        neutral: {
          600: '#FFFFFF',
          500: '#F5F5F5',
          400: '#D7D7D7',
          300: '#B4B4B4',
          200: '#4A4A4A',
          100: '#303030'
        },
        primary: {
          500: '#285799'
        },
        secondary: {
          500: '#AF6331'
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
        '1vw': '1vw',
        '2vw': '2vw',
        '3vw': '3vw',
        '4vw': '4vw',
        '5vw': '5vw',
        '6vw': '6vw'
      },
      inset: {
        '0': 0,
        '1r': '1vw',
        '2r': '2vw',
        '3r': '3vw',
        '4r': '4vw',
        'notes-mobile': 'calc((((100vw - 8vw) / 7) * 2) + 4vw - 5px)'
      },
      minHeight: {
        notes: '18rem',
        detail: 'calc(100vh - 8vw - 2rem - 54px)'
      },
      maxHeight: {
        drawerNav: 'calc(100vh - 374px)'
      },
      maxWidth: {
        drawer: '18rem'
      },
      transitionProperty: {
        border: 'border'
      }
    }
  },
  variants: {
    opacity: ['group-hover', 'focus', 'responsive'],
    margin: ['first', 'last'],
    border: ['focus']
  },
  plugins: []
}
