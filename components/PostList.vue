<template>
  <div class="mt-8 px-4">
    <div class="flex flex-wrap">
      <article
        v-for="blog in blogList.contents"
        :key="blog.id"
        class="box-border md:w-1/2 md:px-2 lg:px-3 mb-12"
      >
        <nuxt-link :to="`/${blog.id}`">
          <picture v-if="blog.thumbnail">
            <source
              media="(min-width: 1024px)"
              type="image/webp"
              :srcset="`${blog.thumbnail.url}?ar=3:2&fit=crop&w=440&fm=webp, ${blog.thumbnail.url}?ar=3:2&fit=crop&w=880&fm=webp 2x`"
            />
            <source
              media="(min-width: 768px)"
              type="image/webp"
              :srcset="`${blog.thumbnail.url}?ar=3:2&fit=crop&w=440&fm=webp, ${blog.thumbnail.url}?ar=3:2&fit=crop&w=880&fm=webp 2x`"
            />
            <source
              media="(min-width: 640px)"
              type="image/webp"
              :srcset="`${blog.thumbnail.url}?ar=3:2&fit=crop&w=735&fm=webp, ${blog.thumbnail.url}?ar=3:2&fit=crop&w=1470&fm=webp 2x`"
            />
            <source
              media="(max-width: 640px)"
              type="image/webp"
              :srcset="`${blog.thumbnail.url}?ar=3:2&fit=crop&w=608&fm=webp, ${blog.thumbnail.url}?ar=3:2&fit=crop&w=1216&fm=webp 2x`"
            />
            <img
              :src="`${blog.thumbnail.url}?ar=3:2&fit=crop&w=440`"
              :srcset="`${blog.thumbnail.url}?ar=3:2&fit=crop&w=880&fm=webp 2x`"
              decoding="async"
              width="735"
              height="490"
            />
          </picture>
          <h5
            v-if="blog.categories.length > 0"
            class="my-4 text-xs text-green-700"
            style="color: #0367a6"
          >
            {{ blog.categories[0].name }}
          </h5>
          <h3 class="mt-4 font-bold text-lg">{{ blog.title }}</h3>
          <Time :datetime-text="blog.createdAt" />
        </nuxt-link>
      </article>
    </div>

    <div class="text-center text-sm text-gray-400 py-2">
      {{ pagination.page }} ページ(全{{ pagination.allPage }}ページ中)
    </div>
    <div class="flex text-center border-t-2 border-b-2 py-3">
      <NuxtLink
        v-if="pagination.hasPrev"
        class="flex-grow border-r-2"
        :to="{ name: pagination.prev.name, params: pagination.prev.params }"
      >
        前のページ
      </NuxtLink>
      <span
        v-else
        class="flex-grow border-r-2 pointer-events-none text-gray-300"
        >前のページ</span
      >
      <NuxtLink
        v-if="pagination.hasNext"
        class="flex-grow"
        :to="{ name: pagination.next.name, params: pagination.next.params }"
      >
        次のページ
      </NuxtLink>
      <span v-else class="flex-grow pointer-events-none text-gray-300"
        >次のページ</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { BlogListResponse } from '@/types/blog'
import { Pagination } from '@/types/pagination'

export default defineComponent({
  props: {
    blogList: {
      type: Object as PropType<BlogListResponse>,
      default: () => {},
    },
    pagination: {
      type: Object as PropType<Pagination>,
      default: () => {},
    },
  },
})
</script>
