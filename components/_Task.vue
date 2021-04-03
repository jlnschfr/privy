<template>
  <div class="Task flex items-center">
    <Input
      :id="uuid"
      type="checkbox"
      :checked="state"
      class="hidden"
      @input="onChange('checkbox')"
    />
    <label :for="uuid" class="flex items-center pr-2">
      <span
        class="inline-flex border border-neutral-200 dark:border-neutral-400 w-3 h-3 items-center justify-center transition duration-300"
        ><CheckIcon v-if="state" class="w-2" />
      </span>
    </label>
    <Input
      v-model="text"
      class="border-none pr-2 immune-for-enter"
      :class="{ 'line-through': state }"
      type="text"
      @input="onChange('text')"
    />
  </div>
</template>

<script>
import CheckIcon from '@/assets/svg/check.svg'
import Input from '@/components/_Input'

export default {
  components: {
    CheckIcon,
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
