<template>
  <button
    :class="{
      'bg-pblue-light hover:bg-pblue-dark text-white transition-colors duration-300 px-4 py-1 block':
        type === 'button',
      'border-b-2 border-solid transition-all duration-300 hover:border-porange-light border-transparent':
        type === 'text'
    }"
    @click="$emit('click')"
    v-text="text"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
      required: false
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>
