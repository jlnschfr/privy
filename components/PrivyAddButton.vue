<template>
  <transition name="fade">
    <div v-if="isActive" class="fixed bottom-2r right-4r">
      <CircleLink to="/note"> <PlusIcon class="fill-current w-3"/></CircleLink>
    </div>
  </transition>
</template>

<script>
import CircleLink from '@/components/_CircleLink'
import PlusIcon from '@/assets/svg/plus.svg'

export default {
  components: {
    CircleLink,
    PlusIcon
  },

  props: {
    isActive: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
