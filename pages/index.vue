<template>
  <ul>
    <li v-for="content in contents" :key="content.id">
      <nuxt-link :to="`/${content.id}`">
        {{ content.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({ $config }) {
    const { data } = await axios.get(`${$config.BASE_API_URL}/examples`, {
      headers: { 'X-API-KEY': $config.API_KEY },
    })
    return data
  },
}
</script>
