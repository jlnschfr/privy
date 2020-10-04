module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:tailwind/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'object-shorthand': 0,
    'no-unused-expressions': 0,
    'no-console': 0,
    'vue/no-v-html': 0
  }
}
