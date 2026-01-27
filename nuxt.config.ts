// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@vueuse/motion',
    '@nuxtjs/i18n',
    '@nuxt/image',
    ['@pinia/nuxt', { 
      autoImports: [
        'defineStore',
        'storeToRefs'
      ]
    }],
  ],
  pinia: {
    storesDirs: ['./stores/**']
  },
  i18n: {
    locales: [
      {
        code: 'id',
        iso: 'id-ID',
        name: 'Bahasa Indonesia',
        file: 'id.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    langDir: 'locales',
    defaultLocale: 'id',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  icon: {
    serverBundle: {
      collections: ['uil', 'mdi', 'material-symbols-light']
    }
  },
  runtimeConfig: {
    githubToken: process.env.GITHUB_PERSONAL_TOKEN,
  },
  css: ["v-network-graph/lib/style.css"],
  nitro: {
    preset: 'cloudflare-pages'
  }
})