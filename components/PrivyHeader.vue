<template>
  <header class="flex justify-between bg-pblue-medium items-center px-4r py-2">
    <h1 aria-label="Privy Notes">
      <nuxt-link :to="homeLink">
        <PrivyIcon ref="svg" class="PrivyIcon w-4"
      /></nuxt-link>
    </h1>
    <nav v-if="user" class="flex items-center text-white">
      <p class="mr-4">
        <span class="hidden sm:inline">logged in as</span> {{ user.email }}
      </p>
      <p @click="$emit('toggleDrawer')">
        <MenuIcon class="w-3 fill-current cursor-pointer" />
      </p>
    </nav>
  </header>
</template>

<script>
import MenuIcon from '@/assets/svg/menu.svg'
import PrivyIcon from '@/assets/svg/privy.svg'

export default {
  components: {
    MenuIcon,
    PrivyIcon
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      paths: []
    }
  },

  computed: {
    homeLink() {
      const tag = this.$store.getters.getCurrentTag()
      return tag ? `/notes?tag=${tag}` : `/notes`
    }
  },

  watch: {
    $route() {
      this.animatePaths()
    }
  },

  mounted() {
    this.paths = this.$refs.svg.$el.querySelectorAll('path')
  },

  methods: {
    animatePaths() {
      this.paths.forEach((path, index) => {
        setTimeout(() => {
          path.classList.add('is-animating')

          setTimeout(() => {
            path.classList.remove('is-animating')
          }, 750)
        }, 100 * index)
      })
    }
  }
}
</script>

<style>
.PrivyIcon path.is-animating {
  animation: fill 0.75s ease forwards;
}

@keyframes fill {
  0% {
    fill: current;
  }
  50% {
    fill: theme('colors.pblue.dark');
  }
  100% {
    fill: current;
  }
}
</style>
