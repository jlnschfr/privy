<template>
  <div
    class="font-body font-normal text-neutral-200 bg-neutral-500 min-h-screen pt-6vw"
  >
    <nuxt />
  </div>
</template>

<script>
import auth from '@/mixins/auth.js'

export default {
  name: 'Blank',
  mixins: [auth]
}
</script>
