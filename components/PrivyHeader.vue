<template>
  <header
    class="flex justify-between md:justify-end bg-neutral-600 dark:bg-neutral-50 border-b border-neutral-400 dark:border-neutral-200 items-center px-4vw py-2 transition duration-300"
  >
    <div class="flex items-center md:hidden">
      <h1 aria-label="Privy Notes" class="mr-2">
        <PrivyLogo />
      </h1>
      <Spinner :is-active="isSyncing || !(notes && user)" />
    </div>
    <nav v-if="user" class="flex items-center">
      <nuxt-link to="/admin/" class="flex items-center justify-center">
        My Privy
      </nuxt-link>
      <p class="block md:hidden ml-2" @click="$emit('toggle-drawer')">
        <MenuIcon class="w-3 fill-current cursor-pointer" />
      </p>
    </nav>
  </header>
</template>

<script>
import MenuIcon from '@/assets/svg/menu.svg'
import PrivyLogo from '@/components/PrivyLogo'
import Spinner from '@/components/_Spinner'

export default {
  components: {
    MenuIcon,
    PrivyLogo,
    Spinner
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: null
    },
    notes: {
      type: Array,
      required: false,
      default: () => {}
    },
    isSyncing: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
