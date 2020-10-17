<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="{
      'opacity-50 cursor-not-allowed': disabled,
      'bg-primary-500 text-neutral-600 border-primary-500': primary,
      'bg-secondary-500 text-neutral-600 border-secondary-500': secondary
    }"
    class="bg-transparent text-neutral-200 border-neutral-200 border block px-2 md:px-4 py-0_5"
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
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    primary: {
      type: Boolean,
      default: false,
      required: false
    },
    secondary: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>
