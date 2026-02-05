/// <reference types="node" />
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    /**
     * Public config so the API base can be swapped per environment
     * via `NUXT_PUBLIC_API_BASE` without touching the code.
     */
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://rickandmortyapi.com/api',
    },
  },
})
