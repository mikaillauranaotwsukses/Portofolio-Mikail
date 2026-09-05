// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '~/assets/css/main.css'
  ],

  // Konfigurasi server-side (aman, tidak terexpose ke browser)
  // Nilai bisa di-override via .env: NUXT_ADMIN_PASSWORD, NUXT_SUPABASE_URL, dll
  runtimeConfig: {
    adminPassword:      process.env.NUXT_ADMIN_PASSWORD || 'admin123',
    supabaseUrl:        process.env.NUXT_SUPABASE_URL || '',
    supabaseServiceKey: process.env.NUXT_SUPABASE_SERVICE_KEY || '',
    public: {
      emailjsServiceId:  process.env.NUXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      emailjsTemplateId: process.env.NUXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      emailjsPublicKey:  process.env.NUXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        '@emailjs/browser'
      ]
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png?v=2' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;500;700&family=JetBrains+Mono:wght@400;700&family=Press+Start+2P&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
      ]
    }
  }
})


