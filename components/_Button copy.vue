<template>
  <component
    :is="component"
    :type="type"
    :to="to"
    :class="{
      'bg-pblue-medium hover:bg-pblue-dark text-white transition-all duration-300 px-4 py-1 block': visual,
      'transition-all duration-300 hover:text-porange-dark focus:text-porange-dark': !visual,
      'is-animating text-porange-dark': isAnimating
    }"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
      required: false
    },
    visual: {
      type: Boolean,
      default: false,
      required: false
    },
    to: {
      type: String,
      default: '',
      required: false
    },
    isAnimating: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  computed: {
    component() {
      if (this.type === 'submit' || this.type === 'button') {
        return 'button'
      } else {
        return this.type
      }
    }
  }
}
</script>

<style>
.is-animating {
  animation: fade 0.5s ease forwards infinite alternate;
}

@keyframes fade {
  0% {
    opacity: 0.25;
  }
  100% {
    opacity: 1;
  }
}
</style>
