<template>
  <vue-tags-input
    v-model="tag"
    :tags="tgs"
    @tags-changed="(newTags) => (tgs = newTags)"
  />
</template>

<script>
import isEqual from 'lodash.isequal'
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  components: {
    VueTagsInput
  },
  props: {
    tags: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tgs: this.tags,
      tag: ''
    }
  },
  watch: {
    tags: function() {
      if (!isEqual(this.tgs, this.tags)) {
        this.tgs = this.tags
      }
    },
    tgs: function() {
      this.$emit('changed', this.tgs)
    }
  }
}
</script>

<style>
.vue-tags-input.vue-tags-input {
  max-width: none;
}

.vue-tags-input .ti-tags {
  align-items: center;
}

.vue-tags-input .ti-new-tag-input-wrapper {
  font-size: inherit;
  display: block;
  border-bottom: 1px solid theme('colors.neutral.200') !important;
  padding: 0.5rem 0 !important;
  flex: 0 0 auto !important;
  width: 100%;
  margin-top: 1rem;
}

.vue-tags-input .ti-new-tag-input {
  width: 100%;
}

.vue-tags-input .ti-new-tag-input::placeholder {
  color: theme('colors.neutral.200');
}

.vue-tags-input .ti-input {
  border: none;
  padding: 0;
}

.vue-tags-input .ti-tag {
  margin: 0.5rem 0.5rem 0 0;
  font-size: inherit;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  background-color: theme('colors.primary.500');
  transition: background-color 300ms;
}

/* .vue-tags-input .ti-tag:hover {
  background-color: theme('colors.porange.medium');
} */
</style>
