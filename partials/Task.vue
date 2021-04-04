<template>
  <div class="Task flex items-center">
    <Checkbox :state="state" @input="onChange('checkbox')" />
    <Input
      :label="false"
      :border="false"
      :class="{ 'line-through': state }"
      :value="text"
      type="text"
      @input="onChange('text', $event)"
    />
  </div>
</template>

<script>
import Checkbox from '@/components/_Checkbox'
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
    onChange(type, data) {
      if (type === 'checkbox') {
        this.state = !this.state
      }
      this.$emit('update', {
        uuid: this.uuid,
        data: { text: data, state: this.state },
      })
    },
  },
}
</script>
