<template>
  <ul>
    <li v-for="content in blogList.contents" :key="content.id">
      <nuxt-link :to="`/${content.id}`">
        {{ content.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  useContext,
} from '@nuxtjs/composition-api'
import { BlogListResponse } from '@/types/blog'

export default defineComponent({
  setup() {
    const blogList = ref<BlogListResponse>({} as BlogListResponse)
    const { $config, $axios } = useContext()
    useFetch(async () => {
      const { data } = await $axios.get<BlogListResponse>(
        `${$config.BASE_API_URL}/examples`,
        {
          headers: { 'X-API-KEY': $config.API_KEY },
        }
      )
      blogList.value = data
    })
    return { blogList }
  },
})
</script>
