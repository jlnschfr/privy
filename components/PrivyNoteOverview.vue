<template>
  <section
    class="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4r xl:gap-2r items-center"
  >
    <PrivyNoteTeaser v-for="(item, key) in items" :key="key" :item="item" />

    <div class="fixed bottom-2 right-2">
      <CircleLink to="/notes/new">
        <PlusIcon class="fill-current w-4"
      /></CircleLink>
    </div>
  </section>
</template>

<script>
import CircleLink from '@/atoms/CircleLink'
import PlusIcon from '@/assets/svg/plus.svg'
import PrivyNoteTeaser from '@/components/PrivyNoteTeaser'

export default {
  components: {
    CircleLink,
    PlusIcon,
    PrivyNoteTeaser
  },

  computed: {
    items: function() {
      return this.$store.state.items
    }
  }
}
</script>
