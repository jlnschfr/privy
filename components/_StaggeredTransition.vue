<template>
  <transition-group
    tag="div"
    name="staggered-transition"
    mode="out-in"
    @before-enter="beforeEnter"
  >
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  methods: {
    beforeEnter: (el) => {
      el.style.transitionDelay = `${el.dataset.index * 50}ms`
    }
  }
}
</script>

<style>
.staggered-transition-enter-active,
.staggered-transition-leave-active {
  transition: all 300ms ease;
}
.staggered-transition-enter,
.staggered-transition-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
