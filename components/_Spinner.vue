<template>
  <transition name="fade">
    <SpinnerIcon v-if="isActive" class="w-4" />
  </transition>
</template>

<script>
export default {
  components: {
    SpinnerIcon: () => import('@/assets/svg/spinner.svg'),
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
