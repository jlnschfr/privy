<template>
  <nuxt />
</template>

<script>
import auth from '@/mixins/auth.js'

export default {
  name: 'Blank',
  mixins: [auth]
}
</script>
