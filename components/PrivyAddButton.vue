<template>
  <transition name="fade">
    <div v-if="isActive" class="fixed bottom-2vw right-4vw">
      <nuxt-link
        tabindex="1"
        to="/note"
        class="bg-secondary-500 shadow-lg text-white rounded-full h-16 w-16 flex items-center justify-center"
      >
        <PlusIcon class="fill-current w-4" />
      </nuxt-link>
    </div>
  </transition>
</template>

<script>
import PlusIcon from '@/assets/svg/plus.svg'

export default {
  components: {
    PlusIcon
  },

  props: {
    isActive: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
