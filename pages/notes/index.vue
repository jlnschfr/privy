<template>
  <section class="Notes">
    <nuxt-link to="/notes/detail">Create Note</nuxt-link>
    <ul>
      <li v-for="(item, key) in items" :key="key">
        {{ item.name }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    items: function() {
      return this.$store.state.items;
    }
  }
};
</script>
