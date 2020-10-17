<template>
  <input
    class="bg-transparent placeholder-neutral-200 dark:placeholder-neutral-400 border-b border-neutral-200 dark:border-neutral-400 block w-full appearance-none leading-normal py-1"
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
