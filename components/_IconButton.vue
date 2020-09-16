<template>
  <button
    :type="type"
    class="bg-transparent text-neutral-200 border-neutral-200 border rounded-full h-4 w-4 flex items-center justify-center"
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
