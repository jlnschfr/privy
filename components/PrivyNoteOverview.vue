<template>
  <div class="relative">
    <StaggeredTransition
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4vw lg:gap-2vw pb-4vw md:pb-0 items-center mb-6"
    >
      <PrivyGiphy key="giphy" />
      <PrivyNoteTeaser
        v-for="(note, key) in notes"
        :key="key"
        :note="note"
        :data-index="key"
      />
    </StaggeredTransition>
  </div>
</template>

<script>
import PrivyGiphy from '@/components/PrivyGiphy'
import PrivyNoteTeaser from '@/components/PrivyNoteTeaser'
import StaggeredTransition from '@/components/_StaggeredTransition'

export default {
  components: {
    PrivyGiphy,
    PrivyNoteTeaser,
    StaggeredTransition,
  },

  props: {
    notes: {
      type: Array,
      required: true,
    },
  },
}
</script>
