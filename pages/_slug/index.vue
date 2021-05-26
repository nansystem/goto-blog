<template>
  <main class="main">
    <h1 class="title">{{ blog.title }}</h1>
    <p class="publishedAt">{{ blog.publishedAt }}</p>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="post" v-html="body"></div>
  </main>
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
        `${$config.BASE_API_URL}/examples/${slug}`,
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
