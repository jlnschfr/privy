<template>
  <button
    class="mt-8 bg-blue-500 text-white px-8 py-2 block w-full"
    v-text="text"
  />
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
