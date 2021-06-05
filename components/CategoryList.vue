<template>
  <div class="overflow-hidden shadow p-4">
    <div class="border-b-2 border-blue font-bold">カテゴリー</div>
    <ul v-for="c in categories.contents" :key="c.id">
      <li class="p-2 border-b">
        <nuxt-link :to="`/category/${c.id}`">{{ c.name }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  useContext,
} from '@nuxtjs/composition-api'
import { CategoryListResponse } from '@/types/blog'

export default defineComponent({
  setup() {
    const { $config, $axios } = useContext()
    const categoryList = ref<CategoryListResponse>({
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    } as CategoryListResponse)

    const limit = 100
    useFetch(async () => {
      const { data } = await $axios.get<CategoryListResponse>(
        `${$config.BASE_API_URL}/categories?limit=${limit}`,
        {
          headers: { 'X-API-KEY': $config.API_KEY },
        }
      )
      categoryList.value = data
    })
    return { categories: categoryList }
  },
})
</script>
