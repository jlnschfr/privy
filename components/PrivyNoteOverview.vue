<template>
  <div class="relative">
    <StaggeredTransition
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4vw lg:gap-2vw pb-4vw md:pb-0 items-center mb-6"
    >
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
export default {
  components: {
    PrivyNoteTeaser: () => import('@/components/PrivyNoteTeaser'),
    StaggeredTransition: () => import('@/components/_StaggeredTransition'),
  },

  props: {
    notes: {
      type: Array,
      required: true,
    },
  },
}
</script>
