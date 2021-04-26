<template>
  <div>
    <ul class="flex flex-wrap">
      <li
        v-for="(tag, key) in tags"
        :key="key"
        class="px-2 py-0_5 mr-1 mt-1 bg-primary-500 text-neutral-600 rounded-full flex items-center justify-center"
      >
        {{ tag.text }}
        <button
          aria-label="remove tag"
          class="ml-1 inline privy-focus-white"
          @click="removeTag(tag.text)"
        >
          <CloseIcon class="fill-current w-2" />
        </button>
      </li>
    </ul>
    <Input
      v-model="value"
      class="mt-1"
      placeholder="Your Tag"
      type="text"
      @enter="addTag"
    />
  </div>
</template>

<script>
export default {
  components: {
    CloseIcon: () => import('@/assets/svg/cross.svg'),
    Input: () => import('@/components/_Input'),
  },
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    addTag(text) {
      if (text && !this.tags.find((tag) => tag.text === text)) {
        this.$emit('changed', [...this.tags, { text }])
        this.value = ''
      }
    },
    removeTag(text) {
      const index = this.tags.findIndex((tag) => tag.text === text)

      if (index >= 0) {
        const tags = [...this.tags]
        tags.splice(index, 1)
        this.$emit('changed', tags)
      }
    },
  },
}
</script>
