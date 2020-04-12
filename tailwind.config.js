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
          dark: '#a0aec0',
          drawer: 'rgba(9, 84, 249, 0.85)'
        },
        pblue: {
          light: '#AED0FF',
          medium: '#096FFF',
          dark: '#0954F9'
        },
        porange: {
          light: '#F9B48A',
          medium: '#FA9083',
          dark: '#F62F17'
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
        '1r': '1vw',
        '2r': '2vw',
        '3r': '3vw',
        '4r': '4vw'
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
      minWidth: {
        drawer: '24rem'
      },
      transitionProperty: {
        border: 'border'
      }
    }
  },
  variants: {
    opacity: ['group-hover', 'focus', 'responsive'],
    margin: ['first'],
    border: ['focus']
  },
  plugins: []
}
