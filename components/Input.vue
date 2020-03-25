<template>
  <input
    class="bg-transparent placeholder-pblue-light focus:outline-none focus:border-pblue-dark border-b border-pblue-light block w-full appearance-none leading-normal py-1"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    autocomplete="off"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Placeholder'
    }
  }
}
</script>
