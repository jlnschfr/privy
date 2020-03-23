<template>
  <div class="min-h-notes inline-flex shadow-lg" @click="open(item.id)">
    <div class="w-64 p-4 flex items-center text-pblue-light">
      <h2 class="text-5xl leading-none">{{ item.title }}</h2>
    </div>
    <div class="flex p-4 text-white bg-pblue-light relative items-center">
      <p class="flex flex-col text-right mr-4">
        <strong class="text-5xl leading-none">24</strong>tasks
      </p>
      <p class="flex flex-col text-right">
        <strong class="text-5xl leading-none">10</strong>done
      </p>
      <button
        :class="{
          'border-b-2 border-solid border-porange-light': isActiveForDelete
        }"
        class="absolute bottom-1 right-2"
        @click.stop="remove(item)"
      >
        Delete <span v-if="isActiveForDelete">?</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isActiveForDelete: false
    }
  },

  methods: {
    open(id) {
      this.$router.push(`/notes/${id}`)
    },

    remove(item) {
      if (this.isActiveForDelete) {
        this.$store.dispatch('deleteItem', item)
      } else {
        this.isActiveForDelete = true
      }
    }
  }
}
</script>
