<template>
  <div>
    <input v-model="item" type="text" />
    <button @click="addItem">save</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: ''
    }
  },

  methods: {
    addItem() {
      this.$store.dispatch('addItem', { name: this.item }).then(() => {
        this.$router.push('/notes')
      })
    }
  }
}
</script>
