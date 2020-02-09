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
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['assets/css/fonts.css'],

  router: {
    middleware: 'auth'
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/firebase' }],
  /*
   ** Nuxt.js modules
   */
  modules: [],

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
  }
}
