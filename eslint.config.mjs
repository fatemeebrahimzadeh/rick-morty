// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Nuxt pages like index.vue
    'vue/multi-word-component-names': 'off',

    // cleaner code
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // prevent unused vars
    'no-unused-vars': 'warn'
  }
})
