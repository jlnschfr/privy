<template>
  <div>
    <Draggable
      v-model="itms"
      handle=".Dragger"
      ghost-class="Ghost"
      animation="150"
      @start="onStart"
      @change="onChange()"
    >
      <div
        v-for="item in itms"
        :key="item.uuid"
        class="group relative px-2 mt-4 first:mt-0"
      >
        <component
          :is="item.type"
          :data-uuid="item.uuid"
          :data="item.data"
          :uuid="item.uuid"
          class="draggable-item"
          @update="onItemUpdate"
        ></component>
        <button
          tabindex="-1"
          class="Dragger absolute flex justify-center items-center w-3 inset-y-0 left-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2"
        >
          <DragIcon class="DragIcon fill-current" />
        </button>
        <button
          class="absolute flex justify-center w-3 h-3 inset-y-1/2 right-0 opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 transform translate-x-1/2 -translate-y-1/2 privy-focus"
          @click="onItemDelete(item.uuid)"
        >
          <CloseIcon class="fill-current w-2" />
        </button>
      </div>
    </Draggable>
  </div>
</template>

<script>
import isEqual from 'lodash.isequal'
import Draggable from 'vuedraggable'
import CloseIcon from '@/assets/svg/cross.svg'
import DragIcon from '@/assets/svg/drag.svg'
import Markdown from '@/components/_Markdown'
import Task from '@/components/_Task'

export default {
  components: {
    CloseIcon,
    Draggable,
    DragIcon,
    Markdown,
    Task,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      itms: this.items,
    }
  },
  watch: {
    items: function () {
      if (!isEqual(this.itms, this.items)) {
        this.itms = this.items
      }
      this.focusLastAddedItem()
    },
  },

  methods: {
    sortItems(items) {
      const itms = [...items]

      return itms.sort((a, b) => {
        if (a.data?.state && !b.data?.state) {
          return 1
        } else if (
          (a.data?.state && b.data?.state) ||
          (!a.data?.state && !b.data?.state)
        ) {
          return 0
        } else if (!a.data?.state && b.data?.state) {
          return -1
        }

        return 0
      })
    },

    onItemUpdate(payload) {
      const index = this.itms.findIndex((item) => item.uuid === payload.uuid)
      this.itms[index].data = payload.data
      this.itms = this.sortItems(this.itms)
      this.$emit('changed', this.itms)
    },

    onItemDelete(uuid) {
      const index = this.itms.findIndex((item) => item.uuid === uuid)
      const items = [...this.itms]
      this.itms.splice(index, 1)
      this.$emit('changed', this.itms)

      this.$store.dispatch('showSnackbar', {
        text: 'Item deleted',
        action: 'undo',
        callback: () => {
          this.undoRemove(items)
        },
      })
    },

    undoRemove(items) {
      this.$emit('changed', items)
    },

    onStart() {
      window.navigator.vibrate(10)
    },

    onChange() {
      this.$emit('changed', this.itms)
    },

    focusLastAddedItem() {
      setTimeout(() => {
        const item = this.itms.find((item) => item.isNew)

        if (item) {
          const task = document
            .querySelector(`[data-uuid='${item.uuid}']`)
            .querySelector('.Task input:not(.hidden)')

          const markdown = document
            .querySelector(`[data-uuid='${item.uuid}']`)
            .querySelector('.Markdown')

          if (task) {
            task.focus()
          } else if (markdown) {
            markdown.click()
          }

          item.isNew = false
          this.onItemUpdate(item)
        }
      }, 150)
    },
  },
}
</script>

<style>
.DragIcon {
  width: 0.75rem;
}

.light-mode .Ghost {
  background-color: theme('colors.neutral.500');
}

.dark-mode .Ghost {
  background-color: theme('colors.neutral.200');
}
</style>
