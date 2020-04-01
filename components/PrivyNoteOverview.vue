<template>
  <section
    class="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4r xl:gap-2r items-center"
  >
    <PrivyNoteTeaser v-for="(item, key) in items" :key="key" :item="item" />

    <div class="fixed bottom-2r right-2r">
      <CircleLink to="/note"> <PlusIcon class="fill-current w-4"/></CircleLink>
    </div>
  </section>
</template>

<script>
import CircleLink from '@/components/_CircleLink'
import PlusIcon from '@/assets/svg/plus.svg'
import PrivyNoteTeaser from '@/components/PrivyNoteTeaser'
import debounce from 'lodash.debounce'

export default {
  components: {
    CircleLink,
    PlusIcon,
    PrivyNoteTeaser
  },

  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  mounted() {
    this.keyHandler = debounce(this.addNote, 150)
    window.addEventListener('keyup', this.keyHandler)
  },

  destroyed() {
    window.removeEventListener('keyup', this.keyHandler)
  },

  methods: {
    addNote(key) {
      if (key.keyCode === 13) {
        this.$router.push(`/notes`)
      }
    }
  }
}
</script>
