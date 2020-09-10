export default {
  mode: 'spa',
  vue: {
    config: {
      runtimeCompiler: true
    }
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'Privy Notes',
    htmlAttrs: {
      lang: 'de'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Great notes for great people'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#F9B48A' },

  layoutTransition: 'fade',

  /*
   ** Global CSS
   */
  css: [
    'assets/css/fonts.css',
    'assets/css/transitions.css',
    'assets/css/animations.css'
  ],

  router: {
    middleware: 'auth'
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/firebase' },
    { src: '@/plugins/idle-vue.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['nuxt-svg-loader', '@nuxtjs/pwa'],

  pwa: {
    meta: {
      theme_color: '#0954F9'
    }
  },

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss'
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  svgLoader: {
    svgoConfig: false
  }
}
