<template>
  <section class="Notes">
    <nuxt-link to="/notes/new">Create Note</nuxt-link>
    <ul>
      <li v-for="(item, key) in items" :key="key" @click="openDetail(item.id)">
        {{ item.title }}
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
    }
  }
}
</script>
