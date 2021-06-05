<template>
  <div>
    <Header />
    <div class="max-w-screen-xl mx-auto lg:flex lg:flex-wrap justify-between">
      <main class="main lg:flex-1 lg:order-1">
        <PostList :blog-list="blogList" :pagination="pagination" />
      </main>
      <aside class="lg:w-1/3 xl:w-1/4 sidebar lg:flex-initial lg:order-2">
        <div class="my-8 px-4 mx-auto md:mx-4 lg:mx-6">
          <CategoryList />
          <Profile />
        </div>
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
  computed,
} from '@nuxtjs/composition-api'
import { BlogListResponse } from '@/types/blog'
import { PAGE_LIMIT } from '@/constants'
import { Pagination } from '~/types/pagination'

export default defineComponent({
  setup() {
    const { $config, $axios, route } = useContext()

    const limit = PAGE_LIMIT

    const p = route.value.params.p
    const categoryId = route.value.params.categoryId

    const blogList = ref<BlogListResponse>({
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    } as BlogListResponse)
    const page = computed<number>(() => Number(p) || 1)
    const pagination = ref<Pagination>({
      page: 1,
      allPage: 1,
      hasPrev: false,
      prev: { name: 'index' },
      hasNext: false,
      next: { name: 'index' },
    })

    useFetch(async () => {
      const { data } = await $axios.get<BlogListResponse>(
        `${$config.BASE_API_URL}/blogs?limit=${limit}&offset=${
          (page.value - 1) * limit
        }${
          categoryId === undefined
            ? ''
            : `&filters=categories[contains]${categoryId}`
        }`,
        {
          headers: { 'X-API-KEY': $config.API_KEY },
        }
      )
      blogList.value = data
      const totalCount = blogList.value.totalCount
      pagination.value = {
        page: page.value,
        allPage: Math.ceil(totalCount / limit),
        hasPrev: page.value - 1 > 0,
        prev: {
          name: page.value - 1 === 1 ? 'category-categoryId' : 'categories',
          params: { p: (page.value - 1).toString(), categoryId },
        },
        hasNext: totalCount - page.value * limit > 0,
        next: {
          name: 'categories',
          params: { p: (page.value + 1).toString(), categoryId },
        },
      }
    })
    return { blogList, pagination }
  },
})
</script>
