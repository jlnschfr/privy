export default {
  ssr: false,
  target: 'static',
  vue: {
    config: {
      runtimeCompiler: true,
    },
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'Privy Notes',
    htmlAttrs: {
      lang: 'de',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Great notes for great people',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://www.googleapis.com' },
      { rel: 'preconnect', href: 'https://firestore.googleapis.com' },
    ],
    bodyAttrs: {
      class: 'bg-neutral-500 dark:bg-neutral-50',
    },
  },

  loading: false,
  layoutTransition: 'fade',

  /*
   ** Global CSS
   */
  css: ['~/assets/css/fonts.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/idle-vue.js', mode: 'client' }],
  /*
   ** Nuxt.js modules
   */
  modules: ['nuxt-svg-loader', '@nuxtjs/pwa', '@nuxtjs/firebase'],

  router: {
    trailingSlash: true,
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyBlY2FIq7DVRyNpJM3AIPT6-9rxefvNO40',
      authDomain: 'privy-notes.firebaseapp.com',
      projectId: 'privy-notes',
      storageBucket: 'privy-notes.appspot.com',
      messagingSenderId: '946240655964',
      appId: '1:946240655964:web:925b39c629ef4db14ecc99',
    },
    services: {
      auth: true,
      firestore: true,
    },
  },

  pwa: {
    meta: {
      theme_color: '#285799',
    },
  },

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  svgLoader: {
    svgoConfig: false,
  },

  purgeCSS: {
    whitelist: ['dark-mode'],
  },
}
