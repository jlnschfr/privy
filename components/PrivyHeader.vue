<template>
  <header
    class="flex justify-between sm:justify-end bg-neutral-600 border-b border-neutral-400 items-center px-4 py-2"
  >
    <h1 class="block sm:hidden" aria-label="Privy Notes">
      <nuxt-link to="/notes">
        <PrivyIcon ref="svg" class="PrivyIcon w-4"
      /></nuxt-link>
    </h1>
    <nav v-if="user" class="flex sm:hidden items-center">
      <p @click="$emit('toggle-drawer')">
        <MenuIcon class="w-3 fill-current cursor-pointer" />
      </p>
    </nav>
    <p class="hidden sm:block">logged in as {{ user ? user.email : '' }}</p>
  </header>
</template>

<script>
import LogoAnimator from '@/mixins/logo-animator.js'
import MenuIcon from '@/assets/svg/menu.svg'
import PrivyIcon from '@/assets/svg/privy.svg'

export default {
  components: {
    MenuIcon,
    PrivyIcon
  },
  mixins: [LogoAnimator],
  props: {
    user: {
      type: Object,
      required: false,
      default: null
    }
  }
}
</script>
