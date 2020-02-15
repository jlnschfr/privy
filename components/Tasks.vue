<template>
  <div class="flex mt-4 items-center">
    <input
      :id="uuid"
      type="checkbox"
      :checked="state"
      class="hidden"
      @input="handleChange('checkbox')"
    />
    <label :for="uuid" class="pr-2">
      <CheckboxFilled v-if="!state" class="w-3 h-3 fill-current" />
      <Checkbox v-else class="w-3 h-3 fill-current" />
    </label>
    <Input
      v-model="text"
      :class="{ 'line-through text-pgray-medium': !state }"
      type="text"
      @input="handleChange()"
    />
  </div>
</template>

<script>
import Input from '@/components/Input'
import CheckboxFilled from '@/assets/svg/checkbox-filled.svg'
import Checkbox from '@/assets/svg/checkbox.svg'

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
      text: '',
      state: false
    }
  },
  created() {
    this.text = this.data.text
    this.state = this.data.state
  },
  methods: {
    handleChange: function(type) {
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
