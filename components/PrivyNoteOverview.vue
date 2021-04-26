<template>
  <div
    class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4vw lg:gap-2vw pb-4vw md:pb-0 items-center mb-6"
  >
    <LazyHydrate v-for="(note, key) in notes" :key="key" when-visible>
      <PrivyNoteTeaser :note="note" />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'

export default {
  components: {
    LazyHydrate,
    PrivyNoteTeaser: () => import('@/components/PrivyNoteTeaser'),
  },

  props: {
    notes: {
      type: Array,
      required: true,
    },
  },
}
</script>
