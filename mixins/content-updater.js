export default {
  data() {
    return {
      frequentUpdates: false,
      isIdle: false
    }
  },

  mounted() {
    this.bindFrequentUpdates()
  },

  destroyed() {
    this.unbindFrequentUpdates()
  },

  onIdle() {
    this.isIdle = true
  },

  onActive() {
    this.isIdle = false
  },

  methods: {
    bindFrequentUpdates() {
      if (!this.frequentUpdates) {
        this.frequentUpdates = setInterval(() => {
          if (navigator.onLine) {
            if (
              !this.isIdle ||
              document.activeElement.tagName.toUpperCase() === 'INPUT' ||
              document.activeElement.tagName.toUpperCase() === 'TEXTAREA' ||
              document.activeElement.closest('.ProseMirror')
            ) {
              return
            }
            this.$store.dispatch('getNotes')
          }
        }, 15000)
      }
    },

    unbindFrequentUpdates() {
      if (this.frequentUpdates) {
        clearInterval(this.frequentUpdates)
      }
    }
  }
}
