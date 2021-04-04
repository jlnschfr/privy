<template>
  <nuxt-link to="/notes/" class="privy-focus">
    <PrivyIcon ref="svg" :class="widthClass"
  /></nuxt-link>
</template>

<script>
import PrivyIcon from '@/assets/svg/privy.svg'

export default {
  components: {
    PrivyIcon,
  },

  props: {
    width: {
      type: String,
      required: false,
      default: '4',
    },
  },

  data() {
    return {
      paths: [],
    }
  },

  computed: {
    widthClass() {
      return `w-${this.width}`
    },
  },

  watch: {
    $route() {
      this.animatePaths()
    },
  },

  mounted() {
    this.getPaths()
  },

  methods: {
    getPaths() {
      this.paths = this.$refs.svg?.$el.querySelectorAll('path')
    },

    animatePaths() {
      this.getPaths()

      if (this.paths) {
        this.paths.forEach((path, index) => {
          setTimeout(() => {
            path.classList.add('has-fill-animation')

            setTimeout(() => {
              path.classList.remove('has-fill-animation')
            }, 750)
          }, 100 * index)
        })
      }
    },
  },
}
</script>

<style>
.has-fill-animation {
  animation: fill 0.75s ease forwards;
}

@keyframes fill {
  0% {
    fill: current;
  }
  50% {
    fill: theme('colors.secondary.500');
  }
  100% {
    fill: current;
  }
}
</style>
