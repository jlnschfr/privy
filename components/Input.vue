<template>
  <input
    class="bg-transparent placeholder-pgray-dark focus:outline-none focus:border-pgray-dark border-b border-pgray-medium block w-full appearance-none leading-normal py-1 mt-4"
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
  }
}
</script>
