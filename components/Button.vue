<template>
  <button
    :class="{
      'bg-pblue-medium hover:bg-pblue-dark text-white transition-colors duration-500 px-4 py-1 block':
        type === 'button',
      'border-b-2 border-solid transition-all duration-300 hover:border-porange-light border-pblue-light':
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
    },
    classes: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      buttonClasses: '',
      textClasses: ''
    }
  }
}
</script>
