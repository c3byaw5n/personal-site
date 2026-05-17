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
  icon: {
    mode: 'css',
    cssLayer: 'base',
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/sitemap',
    '@tresjs/nuxt',
    'nuxt-security',
  ],
  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none',
      contentSecurityPolicy: {
        'frame-ancestors': ["'none'"],
        'img-src': ["'self'", 'data:', 'blob:', 'https:'],
        'script-src': [
          "'self'",
          'https:',
          "'unsafe-inline'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'",
          "'wasm-unsafe-eval'",
        ],
      },
    },
  },
  site: {
    url: 'https://haruhi-arai.me',
    name: '荒井 春陽',
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
    },
  },
})
