<template>
  <transition name="fade">
    <div v-if="isActive" class="absolute right-4r top-1r">
      <SpinnerIcon class="w-4" />
    </div>
  </transition>
</template>

<script>
import SpinnerIcon from '@/assets/svg/spinner.svg'

export default {
  components: {
    SpinnerIcon
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
