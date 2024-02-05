// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    krakenApiUrl: process.env.KRAKEN_API_URL,
    krakenApiKey: process.env.KRAKEN_API_KEY,
    krakenApiPrivateKey: process.env.KRAKEN_API_PRIVATE_KEY,
  },
})
