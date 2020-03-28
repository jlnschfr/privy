<template>
  <header class="flex justify-between bg-pblue-light items-center px-4r py-2">
    <h1 aria-label="Privy Notes">
      <nuxt-link to="/notes"><PrivyIcon class="w-4"/></nuxt-link>
    </h1>
    <nav v-if="user" class="flex items-center text-white">
      <p class="mr-4">
        <span class="hidden sm:inline">logged in as</span> {{ user.email }}
      </p>
      <Button text="Logout" type="text" @click="$emit('logout')" />
    </nav>
  </header>
</template>

<script>
import Button from '@/components/Button'
import PrivyIcon from '@/assets/svg/privy.svg'

export default {
  components: {
    Button,
    PrivyIcon
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
