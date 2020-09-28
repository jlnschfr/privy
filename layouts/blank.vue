<template>
  <div
    class="font-body font-normal text-neutral-200 bg-neutral-500 min-h-screen p-4vw relative"
  >
    <nuxt />
  </div>
</template>

<script>
import AuthHandler from '@/mixins/auth-handler.js'

export default {
  name: 'Blank',
  mixins: [AuthHandler]
}
</script>
