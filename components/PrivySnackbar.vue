<template>
  <transition v-if="isActive" name="fade">
    <div
      class="bg-neutral-200 fixed transform -translate-x-1/2 left-50 md:left-app bottom-2vw px-3 py-2 shadow-lg flex items-center justify-between min-w-snackbar"
    >
      <p class="text-neutral-600 flex-auto">{{ text }}</p>
      <button
        ref="button"
        class="font-bold text-secondary-500 ml-5 privy-focus"
        @click="undo"
      >
        {{ action }}
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      timeout: null,
      activeElement: null,
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
    action() {
      return this.snackbar?.action
    },
    isActive() {
      return this.$store.getters.getSnackbarIsActive()
    },
  },

  watch: {
    isActive: function () {
      if (this.isActive) {
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.$nextTick(() => {
          this.activeElement = document.activeElement
          this.$refs.button.focus()
        })
        this.timeout = setTimeout(() => {
          this.$store.dispatch('hideSnackbar')
        }, 8000)
      } else if (this.timeout) {
        clearTimeout(this.timeout)
      }
    },
  },
  methods: {
    undo() {
      this.callback()
      this.$store.dispatch('hideSnackbar')
      if (this.activeElement) {
        this.activeElement.focus()
        this.activeElement = null
      }
    },
  },
}
</script>
