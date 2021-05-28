<template>
  <div class="mt-8 px-4">
    <article
      v-for="content in blogList.contents"
      :key="content.id"
      class="mb-12"
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
        <time class="mt-0.5 text-xs text-gray-500">{{
          `${$dayjs(content.createdAt).year()}年${
            $dayjs(content.createdAt).month() + 1
          }月${$dayjs(content.createdAt).date()}日`
        }}</time>
      </nuxt-link>
    </article>
  </div>
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
        `${$config.BASE_API_URL}/blogs`,
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
