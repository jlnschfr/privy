<template>
  <input
    class="bg-transparent placeholder-neutral-200 focus:outline-none border-b border-neutral-200 block w-full appearance-none leading-normal py-1"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    autocomplete="off"
    @input="$emit('input', $event.target.value)"
    @focus="$emit('focus')"
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
