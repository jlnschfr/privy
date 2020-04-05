<template>
  <nuxt-link
    tabindex="1"
    :to="to"
    class="bg-pblue-dark shadow-lg hover:bg-porange-medium focus:bg-porange-light text-white rounded-full h-16 w-16 flex items-center justify-center transition-background duration-300"
  >
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>
