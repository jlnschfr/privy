<template>
  <div>
    <label :for="id" class="flex items-center pr-2">
      <span
        class="inline-flex border border-neutral-200 dark:border-neutral-400 w-3 h-3 items-center justify-center transition duration-300"
        ><CheckIcon v-if="state" class="w-2" />
      </span>
    </label>
    <input
      :id="id"
      class="hidden"
      type="checkbox"
      :checked="state"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus')"
    />
  </div>
</template>

<script>
import CheckIcon from '@/assets/svg/check.svg'
import { v4 as uuid } from 'uuid'

export default {
  components: {
    CheckIcon,
  },
  props: {
    state: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    id() {
      return uuid()
    },
  },
}
</script>
