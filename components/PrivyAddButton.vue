<template>
  <transition name="fade">
    <div v-if="isActive" class="fixed bottom-2vw right-4vw">
      <nuxt-link
        aria-label="Add a new note"
        tabindex="0"
        to="/note/"
        class="bg-secondary-500 hover:bg-secondary-600 shadow-lg text-white rounded-full h-16 w-16 flex items-center justify-center privy-focus-offset"
      >
        <PlusIcon class="fill-current w-4" />
      </nuxt-link>
    </div>
  </transition>
</template>

<script>
export default {
  components: {
    PlusIcon: () => import('@/assets/svg/plus.svg'),
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
