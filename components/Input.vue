<template>
  <input
    class="mt-8 bg-transparent focus:outline-none focus:border-gray-500 border-b border-gray-300 py-2 block w-full appearance-none leading-normal"
    :type="type"
    :placeholder="placeholder"
    autocomplete="off"
    @input="$emit('input', $event.target)"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      input: ''
    }
  }
}
</script>
