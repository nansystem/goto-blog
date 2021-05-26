<template>
  <main class="main">
    <h1 class="title">{{ title }}</h1>
    <p class="publishedAt">{{ publishedAt }}</p>
    <div class="post" v-html="md"></div>
  </main>
</template>

<script>
import axios from 'axios'
import marked from 'marked'

export default {
  async asyncData({ params, $config }) {
    const { data } = await axios.get(
      `${$config.BASE_API_URL}/examples/${params.slug}`,
      {
        headers: { 'X-API-KEY': $config.API_KEY },
      }
    )
    console.info(data)
    return data
  },
  computed: {
    md() {
      return marked(this.article)
    },
  },
}
</script>
