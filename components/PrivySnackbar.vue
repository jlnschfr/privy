<template>
  <transition v-if="isActive" name="fade">
    <div
      class="w-64 bg-neutral-200 fixed transform -translate-x-1/2 left-50 md:left-app bottom-2vw px-3 py-2 shadow-lg flex items-center justify-between"
    >
      <span class="text-neutral-600 mr-8">{{ text }}</span>
      <button class="font-bold text-secondary-500" @click="undo">
        Undo
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      timeout: null
    }
  },
  computed: {
    snackbar() {
      return this.$store.getters.getSnackbar()
    },
    callback() {
      return this.snackbar?.callback
    },
    text() {
      return this.snackbar?.text
    },
    isActive() {
      return this.$store.getters.getSnackbarIsActive()
    }
  },

  watch: {
    isActive: function() {
      if (this.isActive) {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => {
          this.$store.dispatch('hideSnackbar')
        }, 8000)
      } else if (this.timeout) {
        clearTimeout(this.timeout)
      }
    }
  },
  methods: {
    undo() {
      this.callback()
      this.$store.dispatch('hideSnackbar')
    }
  }
}
</script>
