<template>
  <article
    class="PrivyNoteTeaser cursor-pointer shadow-lg bg-neutral-600"
    tabindex="0"
    @click="open(note.id)"
  >
    <div
      class="flex p-4"
      :class="{ 'items-center': !tasks.length, 'items-end': tasks.length }"
    >
      <PrivyDate :date="note.createdDate" />

      <div>
        <h2 class="text-2xl font-bold leading-none w-full hyphens-auto">
          {{ note.title }}
        </h2>
        <p v-if="tasks.length" class="mt-0_5">
          <span>{{ tasks.length }} tasks</span>
          <span>{{ done.length }} done</span>
        </p>
      </div>
    </div>
    <div class="flex items-center justify-between p-4">
      <div class="flex items-center">
        <p
          v-for="(noteTag, key) in note.tags.slice(0, 1)"
          :key="key"
          class="px-2 py-0_5 mr-1 bg-primary-500 text-neutral-600 rounded-full flex items-center justify-center"
        >
          {{ noteTag.text }}
        </p>
        <p v-if="note.tags.length > 1">+{{ note.tags.length - 1 }}</p>
      </div>
      <PrivyNoteInteraction :note="note" />
    </div>
  </article>
</template>

<script>
import PrivyDate from '@/components/PrivyDate'
import PrivyNoteInteraction from '@/components/PrivyNoteInteraction'

export default {
  components: {
    PrivyDate,
    PrivyNoteInteraction
  },

  props: {
    note: {
      type: Object,
      required: true
    }
  },

  computed: {
    tasks() {
      return this.note.items.filter((item) => {
        return item.type === 'Task'
      })
    },
    done() {
      return this.tasks.filter((item) => {
        return item.data && item.data.state
      })
    }
  },

  methods: {
    open(id) {
      this.$router.push(`/note?id=${id}`)
    }
  }
}
</script>

<style scoped>
.hyphens-auto {
  hyphens: auto;
}
</style>
