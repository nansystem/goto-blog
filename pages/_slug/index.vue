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
                media="(min-width: 1024px)"
                type="image/webp"
                :srcset="`${blog.thumbnail.url}?ar=3:2&fit=crop&w=936&fm=webp, ${blog.thumbnail.url}?ar=3:2&fit=crop&w=1872&fm=webp 2x`"
              />
              <source
                media="(min-width: 768px)"
                type="image/webp"
                :srcset="`${blog.thumbnail.url}?ar=3:2&fit=crop&w=736&fm=webp, ${blog.thumbnail.url}?ar=3:2&fit=crop&w=1472&fm=webp 2x`"
              />
              <source
                media="(min-width: 640px)"
                type="image/webp"
                :srcset="`${blog.thumbnail.url}?ar=3:2&fit=crop&w=608&fm=webp, ${blog.thumbnail.url}?ar=3:2&fit=crop&w=1216&fm=webp 2x`"
              />
              <source
                media="(max-width: 640px)"
                type="image/webp"
                :srcset="`${blog.thumbnail.url}?ar=3:2&fit=crop&w=608&fm=webp, ${blog.thumbnail.url}?ar=3:2&fit=crop&w=1216&fm=webp 2x`"
              />
              <img
                :src="`${blog.thumbnail.url}?ar=3:2&fit=crop&w=936`"
                :srcset="`${blog.thumbnail.url}?ar=3:2&fit=crop&w=1872 2x`"
                decoding="async"
                width="936"
                height="624"
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
        <Profile class="mt-12 mx-auto p-4 md:mx-4 lg:mx-6" :profile="profile" />
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
import { BlogResponse, mado, nancy, Profile } from '@/types/blog'
import { Breadcrumb } from '~/components/Breadcrumb.vue'

export default defineComponent({
  setup() {
    const blog = ref<BlogResponse>({} as BlogResponse)
    const { $config, $axios, route, redirect } = useContext()
    const slug = route.value.params.slug

    useFetch(async () => {
      try {
        const { data } = await $axios.get<BlogResponse>(
          `${$config.BASE_API_URL}/blogs/${slug}`,
          {
            headers: { 'X-API-KEY': $config.API_KEY },
          }
        )
        blog.value = data
      } catch (e) {
        redirect(404, '/404')
      }
    })

    useMeta(() => ({
      title: blog.value.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: blog.value.description || '',
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
      ],
    }))

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

    const profile = computed<Profile>({
      get: () => {
        if (
          blog.value.author !== undefined &&
          blog.value.author[0] === 'madoka'
        ) {
          return mado
        }
        return nancy
      },
      set: () => {},
    })

    return { blog, breadcrumbs, firstBreadcrumbs, profile }
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
  a {
    color: #0367a6;
    text-decoration: underline;
    word-wrap: break-word;
    word-break: break-all;
  }
}
</style>
