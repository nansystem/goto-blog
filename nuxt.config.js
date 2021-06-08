import { sortRoutes } from '@nuxt/utils'
import axios from 'axios'

const { API_KEY, BASE_API_URL } = process.env

const title = '五島しまあそび'
const description = '五島列島福江島の日常ブログです。'
const uri = 'https://gotoretto.com'

export default {
  publicRuntimeConfig: {
    API_KEY,
    BASE_API_URL,
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja',
    },
    title,
    titleTemplate: '%s |' + ' ' + title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:site_name', property: 'og:site_name', content: title },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: uri },
      { hid: 'og:title', property: 'og:title', content: title },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: uri + '/images/ogp.png',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@nan_system' },
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
    '@nuxtjs/google-gtag',
    '@nuxtjs/sitemap',
    '@nuxtjs/feed',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue|ts)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },

  // https://github.com/nuxt-community/dayjs-module
  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
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

  'google-gtag': {
    id: 'G-SZ6YQSSNSD',
    debug: false,
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: uri,
    exclude: ['/draft', '/404'],
    gzip: true,
    trailingSlash: true,
  },

  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title,
          link: `${uri}/feed.xml`,
          description,
        }

        const posts = await axios
          .get(`${API_KEY}/blogs`, {
            headers: { 'X-API-KEY': API_KEY },
          })
          .then((res) => res.data.contents)

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://gotoretto.com/${post.id}/`,
            description: post.description || '',
            content: post.description || '',
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],
}
