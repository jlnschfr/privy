<template>
  <Draggable
    v-model.lazy="items"
    handle=".Dragger"
    ghost-class="Ghost"
    @start="isDragging = true"
    @end="isDragging = false"
  >
    <div
      v-for="item in items"
      :key="item.uuid"
      class="group relative pr-4r xl:pr-2r mt-4 first:mt-0 pl-4r sm:pl-0"
    >
      <component
        :is="item.type"
        :data="item.data"
        :uuid="item.uuid"
        :editable="!isDragging"
        @update="onItemUpdate"
      ></component>
      <button
        class="Dragger absolute inset-y-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <DragIcon class="DragIcon fill-current" />
      </button>
      <button
        class="Close absolute inset-y-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        @click="onItemDelete(item.uuid)"
      >
        <CloseIcon class="CloseIcon fill-current" />
      </button>
    </div>
  </Draggable>
</template>

<script>
import Draggable from 'vuedraggable'
import DragIcon from '@/assets/svg/new/drag.svg'
import CloseIcon from '@/assets/svg/new/cross.svg'
import Rte from '@/components/_Rte'
import Task from '@/components/_Task'

export default {
  components: {
    Draggable,
    Rte,
    Task,
    DragIcon,
    CloseIcon
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tempItems: this.items || [],
      isDragging: false
    }
  },
  computed: {
    items: {
      get() {
        return this.$store.getters.getItem(this.id).items
      },
      set(value) {
        // eslint-disable-next-line no-console
        console.log(value)
        this.$store.dispatch('updateItemItems', {
          id: this.id,
          items: this.items
        })
      }
    }
  },
  methods: {
    onItemUpdate(payload) {
      const index = this.items.findIndex((item) => item.uuid === payload.uuid)
      const items = this.items.slice()
      items[index].data = payload.data
      this.items = items
    },

    onItemDelete(uuid) {
      const index = this.items.findIndex((item) => item.uuid === uuid)
      this.items.splice(index, 1)
    }
  }
}
</script>

<style>
.Dragger {
  left: 0;
  transform: translateX(-150%);
}

.DragIcon {
  width: 0.75rem;
}

.CloseIcon {
  width: 0.6rem;
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
