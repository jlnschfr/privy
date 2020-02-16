<template>
  <section class="Notes">
    <nuxt-link to="/notes/new">Create Note</nuxt-link>
    <ul>
      <li v-for="(item, key) in items" :key="key" class="bg-pgray-light mt-2">
        <h2 @click="openDetail(item.id)">{{ item.title }}</h2>
        <button @click="deleteItem(item)">DELETE</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    items: function() {
      return this.$store.state.items
    }
  },
  methods: {
    openDetail(id) {
      this.$router.push(`/notes/${id}`)
    },

    deleteItem(item) {
      this.$store.dispatch('deleteItem', item)
    }
  }
}
</script>
