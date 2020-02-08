<template>
  <header
    class="flex justify-between items-center bg-pgray-light shadow-lg p-4"
  >
    <h1 class="text-2xl tracking-wider font-semibold font-title">Privy</h1>
    <nav v-if="user" class="flex items-center">
      <p class="text-pgray-dark mr-2">logged in as {{ user.email }}</p>
      <Button text="Logout" @click="$emit('logout')" />
    </nav>
  </header>
</template>

<script>
import Button from '@/components/Button'

export default {
  components: {
    Button
  },
  props: {
    user: {
      type: Object,
      default: null,
      required: false
    }
  }
}
</script>
