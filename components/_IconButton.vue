<template>
  <button
    :type="type"
    class="bg-transparent border-neutral-200 dark:border-neutral-400 border rounded-full h-4 w-4 flex items-center justify-center privy-focus-offset"
    @click.prevent.stop="$emit('click')"
    @keyup.enter.prevent.stop=""
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
      required: false,
    },
  },
}
</script>
