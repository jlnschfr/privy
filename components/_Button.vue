<template>
  <button
    :type="type"
    class="bg-transparent text-neutral-200 border-neutral-200 border px-4 py-1 block"
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
