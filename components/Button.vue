<template>
  <button
    :class="classes"
    class="bg-pblue-medium hover:bg-pblue-dark text-white transition-colors duration-500 px-4 py-1 block"
    @click="$emit('click')"
    v-text="text"
  />
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    classes: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
