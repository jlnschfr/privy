<template>
  <section class="fixed w-screen h-drawer left-0 bottom-0 z-50">
    <aside class="absolute top-0 right-0 z-10 bg-white p-4r h-full">
      <header>
        <p>{{ user.email }}</p>
        <ul>
          <li>My Profile</li>
          <li>Logout</li>
        </ul>
      </header>
      <nav>
        <ul>
          <li v-for="(tag, key) in tags" :key="key">
            <nuxt-link :to="`notes?tag=${tag}`">
              {{ tag }} <span>{{ getAmount(tag) }}</span></nuxt-link
            >
          </li>
        </ul>
      </nav>
    </aside>
    <div
      class="opacity-75 bg-pgray-dark w-full h-full absolute top-0 left-0"
    ></div>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: false,
      default: () => {}
    },
    items: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  computed: {
    availableTags() {
      return this.items.flatMap((item) => item.tags).map((item) => item.text)
    },

    tags() {
      return this.availableTags.filter(
        (item, pos, arr) => arr.indexOf(item) === pos
      )
    }
  },

  methods: {
    getAmount(tag) {
      return this.availableTags.filter((item) => item === tag).length
    }
  }
}
</script>
