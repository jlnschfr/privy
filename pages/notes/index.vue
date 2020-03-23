<template>
  <section class="p-4">
    <div class="fixed bottom-2 right-2">
      <nuxt-link
        to="/notes/new"
        class="bg-pblue-light text-white rounded-full h-16 w-16 flex items-center justify-center"
        ><Plus class="fill-current w-4" />
      </nuxt-link>
    </div>

    <div>
      <article v-for="(item, key) in items" :key="key" class="mt-4">
        <NoteTeaser :item="item" />
      </article>
    </div>

    <grid-layout
      :layout.sync="layout"
      :row-height="100"
      :is-draggable="true"
      :is-resizable="false"
      :responsive="true"
      :vertical-compact="false"
      :margin="[10, 10]"
      :use-css-transforms="true"
      :breakpoints="{ lg: 1200, md: 768 }"
      :cols="{ lg: 3, md: 2 }"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        class="bg-pgray-light"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        {{ item.i }}
      </grid-item>
    </grid-layout>
  </section>
</template>

<script>
import Plus from '@/assets/svg/plus.svg'
import NoteTeaser from '@/components/NoteTeaser'
import VueGridLayout from 'vue-grid-layout'

export default {
  components: {
    Plus,
    NoteTeaser,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },

  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 1, h: 1, i: '0' },
        { x: 1, y: 0, w: 1, h: 1, i: '1' },
        { x: 2, y: 0, w: 1, h: 1, i: '2' },
        { x: 0, y: 1, w: 1, h: 1, i: '3' },
        { x: 1, y: 1, w: 1, h: 1, i: '4' }
      ]
    }
  },

  computed: {
    items: function() {
      return this.$store.state.items
    }
  }
}
</script>
