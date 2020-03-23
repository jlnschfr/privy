<template>
  <section class="p-2 md:p-4 xl:p-8">
    <div class="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <article v-for="(item, key) in items" :key="key">
        <NoteTeaser :item="item" />
      </article>
    </div>

    <div class="fixed bottom-2 right-2">
      <nuxt-link
        to="/notes/new"
        class="bg-pblue-light text-white rounded-full h-16 w-16 flex items-center justify-center"
        ><Plus class="fill-current w-4" />
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import Plus from '@/assets/svg/plus.svg'
import NoteTeaser from '@/components/NoteTeaser'

export default {
  components: {
    Plus,
    NoteTeaser
  },

  computed: {
    items: function() {
      return this.$store.state.items
    }
  }
}
</script>
