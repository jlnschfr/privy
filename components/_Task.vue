<template>
  <div class="flex items-center">
    <Input
      :id="uuid"
      type="checkbox"
      :checked="state"
      class="hidden"
      @input="onChange('checkbox')"
    />
    <label :for="uuid" class="pr-2">
      <CheckboxFilled v-if="state" class="w-3 h-3 fill-current" />
      <Checkbox v-else class="w-3 h-3 fill-current" />
    </label>
    <Input
      v-model="text"
      class="border-none"
      :class="{ 'line-through text-pgray-dark': state }"
      type="text"
      @input="onChange('text')"
    />
  </div>
</template>

<script>
import Input from '@/components/_Input'
import CheckboxFilled from '@/assets/svg/new/checkbox-checked.svg'
import Checkbox from '@/assets/svg/new/checkbox-unchecked.svg'

export default {
  components: {
    Input,
    CheckboxFilled,
    Checkbox
  },

  props: {
    uuid: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: false,
      default: () => {
        return { state: false, text: '' }
      }
    }
  },
  data() {
    return {
      text: this.data.text,
      state: this.data.state
    }
  },
  methods: {
    onChange: function(type) {
      if (type === 'checkbox') {
        this.state = !this.state
      }
      this.$emit('update', {
        uuid: this.uuid,
        data: { text: this.text, state: this.state }
      })
    }
  }
}
</script>
