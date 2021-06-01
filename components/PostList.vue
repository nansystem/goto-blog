<template>
  <div class="mt-8 px-4">
    <div class="flex flex-wrap">
      <article
        v-for="content in blogList.contents"
        :key="content.id"
        class="box-border md:w-1/2 md:px-2 lg:px-3 mb-12"
      >
        <nuxt-link :to="`/${content.id}`">
          <!-- <picture>
            <source type="image/webp"
              :srcset="`${content.thumbnail.url}?fm=webp&amp;w=160&amp;h=160 1x,
                      ${content.thumbnail.url}?fm=webp&amp;w=320&amp;h=320 2x`">
            <img class=""
              :srcset="`${content.thumbnail.url}?w=160&amp;h=160 1x,
                      ${content.thumbnail.url}?w=320&amp;h=320 2x`"
              :src="`${content.thumbnail.url}?w=160&amp;h=160`"
              alt=""
              width="160"
              height="160">
          </picture>-->
          <picture>
            <img
              :src="`${content.thumbnail.url}?q=80&ar=2:1&fit=crop&fp-y=0.5`"
            />
          </picture>
          <h5
            v-if="content.categories.length > 0"
            class="my-4 text-xs text-green-700"
            style="color: #0367a6"
          >
            {{ content.categories[0].name }}
          </h5>
          <h3 class="mt-4 font-bold text-lg">{{ content.title }}</h3>
          <Time :datetime-text="content.createdAt" />
        </nuxt-link>
      </article>
    </div>
    <div class="text-center text-sm text-gray-400 py-2">
      {{ pagination.page }} ページ(全{{ pagination.allPage }}ページ中)
    </div>
    <div class="flex text-center border-t-2 border-b-2 py-3">
      <NuxtLink
        class="flex-grow border-r-2"
        :class="[
          !pagination.hasPrev ? ['pointer-events-none', 'text-gray-300'] : '',
        ]"
        :to="{
          name: pagination.prevPage === 1 ? 'index' : 'page',
          params: { p: pagination.prevPage },
        }"
      >
        前のページ
      </NuxtLink>
      <NuxtLink
        class="flex-grow"
        :class="[
          !pagination.hasNext ? ['pointer-events-none', 'text-gray-300'] : '',
        ]"
        :to="{ name: 'page', params: { p: pagination.nextPage } }"
      >
        次のページ
      </NuxtLink>
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
  reactive,
} from '@nuxtjs/composition-api'
import { BlogListResponse } from '@/types/blog'

export default defineComponent({
  setup() {
    const { $config, $axios, route } = useContext()
    const blogList = ref<BlogListResponse>({
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
    } as BlogListResponse)
    const limit = 10
    // params not updating ref https://github.com/nuxt/nuxt.js/issues/1546#issuecomment-326267738
    const page = computed<number>(() => Number(route.value.params.p) || 1)
    const allPage = computed<number>(() =>
      Math.ceil(blogList.value.totalCount / limit)
    )
    const hasPrev = computed<boolean>(() => page.value - 1 > 0)
    const prevPage = computed<number>(() => page.value - 1)
    const hasNext = computed<boolean>(
      () => blogList.value.totalCount - page.value * limit > 0
    )
    const nextPage = computed<number>(() => page.value + 1)
    useFetch(async () => {
      const { data } = await $axios.get<BlogListResponse>(
        `${$config.BASE_API_URL}/blogs?limit=${limit}&offset=${
          (page.value - 1) * limit
        }`,
        {
          headers: { 'X-API-KEY': $config.API_KEY },
        }
      )
      blogList.value = data
    })
    // Write operation failed: computed value is readonly
    // ref https://polidog.jp/2021/03/27/nuxt_composition_api/
    const pagination = reactive({
      page,
      allPage,
      hasPrev,
      prevPage,
      hasNext,
      nextPage,
    })
    return { blogList, pagination }
  },
})
</script>
