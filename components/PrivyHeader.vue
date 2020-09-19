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
    <nav v-if="user" class="flex md:hidden items-center">
      <p @click="$emit('toggle-drawer')">
        <MenuIcon class="w-3 fill-current cursor-pointer" />
      </p>
    </nav>
    <p class="hidden md:block">logged in as {{ user ? user.email : '' }}</p>
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
    isFetchingNotes: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
