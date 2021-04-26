<template>
  <div>
    <input
      :id="id"
      class="visuallyhidden"
      type="checkbox"
      :checked="state"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('input', $event.target.value)"
      @focus="$emit('focus')"
    />
    <label aria-label="checkbox" :for="id" class="flex items-center pr-2">
      <span
        class="inline-flex border border-neutral-200 dark:border-neutral-400 w-3 h-3 items-center justify-center"
        ><CheckIcon v-if="state" class="w-2" />
      </span>
    </label>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'

export default {
  components: {
    CheckIcon: () => import('@/assets/svg/check.svg'),
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

<style>
input:focus + label span {
  outline: none;
  box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
  transition: all 300ms;
}
</style>
