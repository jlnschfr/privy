<template>
  <div class="Task flex items-center">
    <Checkbox :state="state" @input="onChange('checkbox')" />
    <Input
      v-model="text"
      :label="false"
      :border="false"
      :class="{ 'line-through': state }"
      type="text"
      @input="onChange('text')"
    />
  </div>
</template>

<script>
import Checkbox from '@/partials/Checkbox'
import Input from '@/partials/Input'

export default {
  components: {
    Checkbox,
    Input,
  },

  props: {
    uuid: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: false,
      default: () => {
        return { state: false, text: '' }
      },
    },
  },
  data() {
    return {
      text: this.data.text,
      state: this.data.state,
    }
  },
  methods: {
    onChange(type) {
      if (type === 'checkbox') {
        this.state = !this.state
      }
      this.$emit('update', {
        uuid: this.uuid,
        data: { text: this.text, state: this.state },
      })
    },
  },
}
</script>
