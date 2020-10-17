<template>
  <button
    :type="type"
    class="bg-transparent border-neutral-200 dark:border-neutral-400 border rounded-full h-4 w-4 flex items-center justify-center transition duration-300"
    @click="$emit('click')"
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
      required: false
    }
  }
}
</script>
