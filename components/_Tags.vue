<template>
  <vue-tags-input
    v-model.lazy="tag"
    :tags="tgs"
    class="immune-for-enter"
    @tags-changed="(newTags) => (tgs = newTags)"
  />
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
import isEqual from 'lodash.isequal'

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

.vue-tags-input .ti-new-tag-input-wrapper {
  font-size: inherit;
}

.vue-tags-input .ti-new-tag-input::placeholder {
  color: theme('colors.pblue.light');
}

.vue-tags-input .ti-input {
  border: none;
  padding: 0;
}

.vue-tags-input .ti-tag {
  margin: 4px;
  font-size: inherit;
  background-color: theme('colors.pblue.medium');
  transition: background-color 300ms;
}

.vue-tags-input .ti-tag:hover {
  background-color: theme('colors.porange.medium');
}
</style>
