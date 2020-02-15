<template>
  <header
    :class="{ 'bg-pgray-light shadow-lg': !isSmall }"
    class="flex justify-between items-center p-4 transition duration-500 ease-in-out"
  >
    <h1 class="text-2xl tracking-wider font-semibold font-title">
      <nuxt-link to="/notes">Privy</nuxt-link>
    </h1>
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
  },

  data() {
    return {
      isSmall: false
    }
  },
  watch: {
    $route(to, from) {
      this.isSmall = to.name === 'notes-id'
    }
  }
}
</script>
