<template>
  <header class="flex justify-between bg-pblue-light items-center px-4 py-2">
    <h1 aria-label="Privy Notes">
      <nuxt-link to="/notes"><Privy class="w-4"/></nuxt-link>
    </h1>
    <nav v-if="user" class="flex items-center ">
      <p class="text-white mr-2">logged in as {{ user.email }}</p>
      <Button text="Logout" @click="$emit('logout')" />
    </nav>
  </header>
</template>

<script>
import Button from '@/components/Button'
import Privy from '@/assets/svg/privy.svg'

export default {
  components: {
    Button,
    Privy
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
