<template>
  <div>
    <Header />

    <div
      class="max-w-screen-xl mx-auto p-4 lg:flex lg:flex-wrap justify-between"
    >
      <main class="main mt-4 lg:flex-1 lg:order-1">
        <div v-if="Object.keys(blog).length !== 0">
          <Breadcrumb :breadcrumbs="firstBreadcrumbs" />
          <div class="mt-4">
            <picture v-if="blog.thumbnail">
              <source
                media="(min-width: 1160px)"
                type="image/webp"
                :srcset="`${blog.thumbnail.url}?w=820&fm=webp, ${blog.thumbnail.url}?w=1640&fm=webp 2x`"
              />
              <source
                media="(min-width: 820px)"
                type="image/webp"
                :srcset="`${blog.thumbnail.url}?w=740&fm=webp, ${blog.thumbnail.url}?w=1480&fm=webp 2x`"
              />
              <source
                media="(min-width: 768px)"
                type="image/webp"
                :srcset="`${blog.thumbnail.url}?w=728&fm=webp, ${blog.thumbnail.url}?w=1456&fm=webp 2x`"
              />
              <source
                media="(max-width: 768px)"
                type="image/webp"
                :srcset="`${blog.thumbnail.url}?w=375&fm=webp, ${blog.thumbnail.url}?w=750&fm=webp 2x`"
              />
              <img
                :src="`${blog.thumbnail.url}?q=80&ar=2:1&fit=crop&fp-y=0.5`"
              />
            </picture>
            <div v-for="b in breadcrumbs" :key="b.link" class="mt-4">
              <nuxt-link
                :to="b.link"
                class="my-4 text-xs"
                style="color: rgb(3, 103, 166)"
                >{{ b.name }}</nuxt-link
              >
            </div>
            <h1 class="text-2xl mt-4">{{ blog.title }}</h1>
            <Time :datetime-text="blog.createdAt" />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="mt-4 post" v-html="blog.body"></div>
          </div>
        </div>
      </main>

      <aside class="lg:w-1/3 xl:w-1/4 sidebar lg:flex-initial lg:order-2">
        <Profile class="mt-12 mx-auto p-4 md:mx-4 lg:mx-6" />
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
  useMeta,
} from '@nuxtjs/composition-api'
import { BlogResponse } from '@/types/blog'
import { Breadcrumb } from '~/components/Breadcrumb.vue'

export default defineComponent({
  setup() {
    const { title, meta } = useMeta()
    const blog = ref<BlogResponse>({} as BlogResponse)
    const { $config, $axios, route, redirect } = useContext()
    useFetch(async () => {
      const slug = route.value.params.slug
      try {
        const { data } = await $axios.get<BlogResponse>(
          `${$config.BASE_API_URL}/blogs/${slug}`,
          {
            headers: { 'X-API-KEY': $config.API_KEY },
          }
        )
        blog.value = data

        title.value = blog.value.title
        meta.value = [
          {
            hid: 'description',
            name: 'description',
            content: blog.value.body || '',
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content: blog.value.title || '',
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: blog.value.thumbnail?.url || '',
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: blog.value.description || '',
          },
          {
            hid: 'og:url',
            property: 'og:url',
            content: `https://gotoretto.com/${slug}`,
          },
        ]
      } catch (e) {
        redirect(404, '/404')
      }
    })
    const breadcrumbs = computed<Breadcrumb[]>({
      get: () => {
        if (
          blog.value.categories === undefined ||
          blog.value.categories.length === 0
        ) {
          return []
        }
        return blog.value.categories!.map((c) => {
          return { name: c.name, link: `/category/${c.id}` }
        })
      },
      set: () => {},
    })
    const firstBreadcrumbs = computed<Breadcrumb[]>({
      get: () => (breadcrumbs.value.length > 0 ? [breadcrumbs.value[0]] : []),
      set: () => {},
    })
    return { blog, breadcrumbs, firstBreadcrumbs }
  },
  head: {},
})
</script>

<style lang="postcss">
.post {
  h1 {
    @apply text-3xl;
  }
  h2 {
    @apply text-2xl;
  }
  h3 {
    @apply text-xl;
  }
  h4 {
    @apply text-lg;
  }
}
</style>
