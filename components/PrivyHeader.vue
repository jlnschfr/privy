<template>
  <header
    class="flex justify-between md:justify-end bg-neutral-600 border-b border-neutral-400 items-center px-4vw py-2"
  >
    <div class="flex items-center md:hidden">
      <h1 aria-label="Privy Notes" class="mr-2">
        <PrivyLogo />
      </h1>
      <Spinner :is-active="isFetchingNotes || !(notes && user)" />
    </div>
    <nav v-if="user" class="flex items-center">
      <p class="block md:hidden" @click="$emit('toggle-drawer')">
        <MenuIcon class="w-3 fill-current cursor-pointer" />
      </p>
      <nuxt-link
        to="/admin/"
        class="flex ml-2 text-neutral-200 border-neutral-200 rounded-full border border-neutral-200 items-center justify-center h-4 w-4"
      >
        <User class="w-2" />
      </nuxt-link>
    </nav>
  </header>
</template>

<script>
import MenuIcon from '@/assets/svg/menu.svg'
import PrivyLogo from '@/components/PrivyLogo'
import Spinner from '@/components/_Spinner'
import User from '@/assets/svg/user.svg'

export default {
  components: {
    MenuIcon,
    PrivyLogo,
    Spinner,
    User
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
    isFetchingNotes: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
