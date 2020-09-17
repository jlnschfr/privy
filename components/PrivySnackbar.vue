<template>
  <transition v-if="active" name="fade">
    <div
      class="min-w-snackbar bg-neutral-600 fixed left-50 bottom-2vw px-3 py-2 shadow-lg flex items-center justify-between"
    >
      <span class="mr-8">{{ text }}</span>
      <button class="font-bold text-primary-500" @click="undo">
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
    active() {
      return this.$store.getters.getSnackbarIsActive()
    }
  },

  watch: {
    active: function() {
      if (this.active) {
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
