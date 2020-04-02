<template>
  <transition-group
    tag="div"
    name="staggered-transition"
    mode="out-in"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  methods: {
    beforeEnter: (el) => {
      el.classList.add('staggered-transition')
    },
    enter: (el, done) => {
      const delay = el.dataset.index * 100
      setTimeout(() => {
        el.classList.add('is-animating')
      }, delay)
    },
    leave: (el, done) => {
      const delay = el.dataset.index * 100
      setTimeout(() => {
        el.classList.remove('is-animating')
      }, delay)
    }
  }
}
</script>

<style>
.staggered-transition {
  transition: all 500ms ease;
  opacity: 0;
  transform: translateY(-50px);
}

.staggered-transition.is-animating {
  opacity: 1;
  transform: translateY(0);
}
</style>
