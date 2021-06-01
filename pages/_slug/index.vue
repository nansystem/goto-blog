<template>
  <div>
    <Header />

    <div
      class="max-w-screen-xl mx-auto p-4 lg:flex lg:flex-wrap justify-between"
    >
      <div v-if="Object.keys(blog).length !== 0">
        <div class="text-xs text-gray-600">
          <nuxt-link to="/">五島ブログ</nuxt-link>
          <template v-if="blog.categories && blog.categories.length > 0">
            >
            <nuxt-link :to="`/category/${blog.categories[0].id}`">{{
              blog.categories[0].name
            }}</nuxt-link>
          </template>
        </div>

        <main class="main mt-4 lg:flex-1 lg:order-1">
          <picture>
            <img :src="`${blog.thumbnail.url}?q=80&ar=2:1&fit=crop&fp-y=0.5`" />
          </picture>
          <div v-if="blog.categories.length > 0" class="my-4 text-xs">
            {{ blog.categories[0].name }}
          </div>
          <h1 class="text-2xl mt-4">{{ blog.title }}</h1>
          <Time :datetime-text="blog.createdAt" />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="mt-4 post" v-html="body"></div>
        </main>
      </div>

      <aside class="lg:w-1/3 xl:w-1/4 sidebar lg:flex-initial lg:order-2">
        <Profile class="mt-8 mx-auto p-4 md:mx-4 lg:mx-6" />
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  useContext,
} from '@nuxtjs/composition-api'
import { BlogResponse } from '@/types/blog'
import marked from 'marked'

export default defineComponent({
  setup() {
    const blog = ref<BlogResponse>({} as BlogResponse)
    const body = ref<string>('')
    const { $config, $axios, route } = useContext()
    useFetch(async () => {
      const slug = route.value.params.slug
      const { data } = await $axios.get<BlogResponse>(
        `${$config.BASE_API_URL}/blogs/${slug}`,
        {
          headers: { 'X-API-KEY': $config.API_KEY },
        }
      )
      blog.value = data
      body.value = marked(blog.value?.body || '')
    })
    return { blog, body }
  },
})
</script>
