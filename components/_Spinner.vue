<template>
  <transition name="fade">
    <SpinnerIcon v-if="isActive" class="w-4" />
  </transition>
</template>

<script>
import SpinnerIcon from '@/assets/svg/spinner.svg'

export default {
  components: {
    SpinnerIcon,
  },

  props: {
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
