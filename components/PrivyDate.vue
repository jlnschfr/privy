<template>
  <div class="text-center border-r pr-2 mr-2 border-neutral-400">
    <span class="block">{{ month }}</span>
    <span class="block text-xl font-bold">{{ day }}</span>
    <span class="block">{{ year }}</span>
  </div>
</template>

<script>
import { createDateString } from '@/utils/date'

export default {
  props: {
    date: {
      type: String,
      required: false,
      default: ''
    }
  },

  computed: {
    month() {
      return createDateString(this.date, { month: 'short' })
    },
    day() {
      return createDateString(this.date, { day: '2-digit' })
    },
    year() {
      return createDateString(this.date, { year: 'numeric' })
    }
  }
}
</script>
