import { sortRoutes } from '@nuxt/utils'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '五島ブログ',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '五島ブログ' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: {
      class: 'body-class',
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.scss'],

  // tailwindcss: {
  //   cssPath: '~/assets/tailwind.scss'
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // https://github.com/nuxt-community/dayjs-module
  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
    // defaultTimeZone: 'Asia/Tokyo',
    // plugins: [
    //   'utc', // import 'dayjs/plugin/utc'
    //   'timezone' // import 'dayjs/plugin/timezone'
    // ] // Your Day.js plugin
  },

  publicRuntimeConfig: {
    API_KEY: process.env.API_KEY,
    BASE_API_URL: process.env.BASE_API_URL,
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'pages',
      })
      routes.push({
        path: '/category/:categoryId/page/:p',
        component: resolve(__dirname, 'pages/category/_categoryId/index.vue'),
        name: 'categories',
      })
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
        name: 'custom',
      })
      sortRoutes(routes)
    },
  },

  generate: {},

  loading: { color: '#0367a6' },
}
