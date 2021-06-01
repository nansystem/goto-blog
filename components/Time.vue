<template>
  <time class="mt-0.5 text-xs text-gray-500">{{ formattedDate }}</time>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

type Props = {
  datetimeText: string
}

export default defineComponent({
  props: {
    datetimeText: {
      type: String,
      default: '',
    },
  },
  setup(props: Props) {
    const { $dayjs } = useContext()
    const formattedDate = computed(() => {
      const year = $dayjs(props.datetimeText).year()
      const month = $dayjs(props.datetimeText).month() + 1
      const date = $dayjs(props.datetimeText).date()
      return `${year}年${month}月${date}日`
    })
    return {
      formattedDate,
    }
  },
})
</script>
