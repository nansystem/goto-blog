import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
export default defineConfig({
  site: 'https://gotoretto.com',
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'never',
})
