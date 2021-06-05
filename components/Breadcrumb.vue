<template>
  <div class="text-xs text-gray-600">
    <ol
      class="breadcrumb"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <li
        v-for="(b, i) in bs"
        :key="b.link"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <nuxt-link :key="b.link" itemprop="item" :to="b.link">
          <!-- <IconHome v-if="i === 0" class="h-4 w-4 inline-block -mt-1 text-gray-500" /> -->
          <span itemprop="name">{{ b.name }}</span></nuxt-link
        >
        <meta itemprop="position" :content="i + 1" />
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export type Breadcrumb = {
  name: string
  link: string
}

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<Breadcrumb[]>,
      default: () => [],
    },
  },
  setup({ breadcrumbs }) {
    let bs = [{ name: '五島ブログ', link: '/' }]
    if (breadcrumbs.length > 0) {
      bs = bs.concat(breadcrumbs)
    }
    return {
      bs,
    }
  },
})
</script>

<style lang="scss" scoped>
.breadcrumb > li {
  display: inline;
}

.breadcrumb > li + li::before {
  margin: 0 5px;
  content: '>';
}
</style>
