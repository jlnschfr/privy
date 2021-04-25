<template>
  <div class="relative">
    <StaggeredTransition
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4vw lg:gap-2vw pb-4vw md:pb-0 items-center mb-6"
    >
      <LazyHydrate v-for="(note, key) in notes" :key="key" when-visible>
        <PrivyNoteTeaser :note="note" :data-index="key" />
      </LazyHydrate>
    </StaggeredTransition>
  </div>
</template>

<script>
export default {
  components: {
    LazyHydrate: () => import('vue-lazy-hydration'),
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
