import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
        },
      },
    },
  },
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/sitemap',
    '@tresjs/nuxt',
  ],
  site: {
    url: 'https://haruhi-arai.me',
    name: '春 PERSONAL SITE',
  },
  typescript: {
    strict: true,
  },
  vite: {
    optimizeDeps: {
      include: ['three', '@vue/devtools-core', '@vue/devtools-kit', 'gsap', '@tresjs/core'],
    },
    plugins: [tailwindcss()],
  },
  $production: {
    scripts: {
      registry: {
        googleAnalytics: {
          id: 'G-WG7L80WQ8K',
          trigger: 'onNuxtReady',
        },
      },
      defaultProxyEnabled: false,
    },
  },
})
