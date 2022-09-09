module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'no-console': 'off',
    eqeqeq: 'off',
    'vue/no-v-html': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/no-reserved-props': 'off',
    'vue/multi-word-component-names': 'off',
    'no-void': 'off'
  }
}
