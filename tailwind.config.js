/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    fontFamily: {
      body: ['Noway', 'sans-serif']
    },
    extend: {
      colors: {
        pgray: {
          light: '#f7fafc',
          medium: '#e2e8f0',
          dark: '#a0aec0'
        },
        pblue: {
          light: '#096FFF',
          dark: '#0954F9'
        },
        porange: {
          light: '#F9B48A',
          dark: '#FA9083'
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
        '10': '5rem',
        '1r': '1vw',
        '2r': '2vw',
        '3r': '3vw',
        '4r': '4vw'
      },
      inset: {
        '0': 0,
        '1/2': '50%',
        '1': '1rem',
        '2': '2rem',
        '1r': '1vw',
        '2r': '2vw',
        '3r': '3vw',
        '4r': '4vw'
      },
      minHeight: {
        notes: '18rem'
      }
    }
  },
  variants: {
    opacity: ['group-hover'],
    margin: ['first']
  },
  plugins: []
}
