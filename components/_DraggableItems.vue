<template>
  <div>
    <Draggable
      v-model="itms"
      handle=".Dragger"
      ghost-class="Ghost"
      animation="150"
      @start="onStart"
      @end="isDragging = false"
      @change="onChange()"
    >
      <div
        v-for="item in itms"
        :key="item.uuid"
        class="group relative pr-4r xl:pr-2r mt-4 first:mt-0 pl-4r sm:pl-0"
      >
        <component
          :is="item.type"
          :data-uuid="item.uuid"
          :data="item.data"
          :uuid="item.uuid"
          :editable="!isDragging"
          class="draggable-item"
          @update="onItemUpdate"
        ></component>
        <button
          class="Dragger absolute flex justify-center w-3 inset-y-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <DragIcon class="DragIcon fill-current" />
        </button>
        <button
          class="Close absolute flex justify-center w-3 inset-y-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          @click="onItemDelete(item.uuid)"
        >
          <CloseIcon class="CloseIcon fill-current w-2" />
        </button>
      </div>
    </Draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import DragIcon from '@/assets/svg/drag.svg'
import CloseIcon from '@/assets/svg/cross.svg'
import Rte from '@/components/_Rte'
import Task from '@/components/_Task'
import isEqual from 'lodash.isequal'

export default {
  components: {
    Draggable,
    Rte,
    Task,
    DragIcon,
    CloseIcon
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDragging: false,
      itms: this.items
    }
  },
  watch: {
    items: function() {
      if (!isEqual(this.itms, this.items)) {
        this.itms = this.items
      }
      this.focusLastAddedItem()
    }
  },

  methods: {
    sortItems(items) {
      const itms = [...items]

      return itms.sort((a, b) => {
        if (a.data.state && !b.data.state) {
          return 1
        } else if (
          (a.data.state && b.data.state) ||
          (!a.data.state && !b.data.state)
        ) {
          return 0
        } else if (!a.data.state && b.data.state) {
          return -1
        }
      })
    },

    onItemUpdate(payload) {
      const index = this.itms.findIndex((item) => item.uuid === payload.uuid)
      const items = this.itms.slice()
      items[index].data = payload.data
      this.itms = this.sortItems(items)
      this.$emit('changed', this.itms)
    },

    onItemDelete(uuid) {
      const index = this.itms.findIndex((item) => item.uuid === uuid)
      this.itms.splice(index, 1)
      this.$emit('changed', this.itms)
    },

    onStart() {
      this.isDragging = true
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
            .querySelector('input:not(.hidden)')

          const rte = document
            .querySelector(`[data-uuid='${item.uuid}']`)
            .querySelector('.ProseMirror')

          if (task) {
            task.focus()
          } else if (rte) {
            rte.focus()
          }

          item.isNew = false
          this.onItemUpdate(item)
        }
      }, 150)
    }
  }
}
</script>

<style>
.Dragger {
  left: 0;
  transform: translateX(-100%);
}

.DragIcon {
  width: 0.75rem;
}

.Ghost {
  background-color: theme('colors.pgray.light');
  color: theme('colors.pblue.dark');
}

@media (max-width: 640px) {
  .Dragger,
  .Close {
    opacity: 1;
    transform: translateX(0);
  }

  .Dragger {
    transform: translateX(-50%);
  }
}
</style>
