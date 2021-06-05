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
            <div class="mt-4 post" v-html="body"></div>
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
} from '@nuxtjs/composition-api'
import { BlogResponse } from '@/types/blog'
import marked from 'marked'
import { Breadcrumb } from '~/components/Breadcrumb.vue'

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
    return { blog, body, breadcrumbs, firstBreadcrumbs }
  },
})
</script>
