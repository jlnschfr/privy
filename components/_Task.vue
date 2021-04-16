<template>
  <div class="Task flex items-center">
    <Checkbox :state="state" @input="onChange('checkbox')" />
    <Input
      :label="false"
      :border="false"
      :class="{ 'line-through': state }"
      :value="text"
      class="new-task-on-enter"
      type="text"
      @input="onChange('text', $event)"
    />
  </div>
</template>

<script>
export default {
  components: {
    Checkbox: () => import('@/components/_Checkbox'),
    Input: () => import('@/components/_Input'),
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
      } else if (type === 'text') {
        this.text = data
      }
      this.$emit('update', {
        uuid: this.uuid,
        data: { text: this.text, state: this.state },
      })
    },
  },
}
</script>
