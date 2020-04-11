<template>
  <section>
    <transition name="slide-right">
      <aside
        v-if="isActive"
        class="fixed top-0 right-0 z-50 bg-white h-full text-pblue-medium"
      >
        <header class="p-4r border-b border-pblue-light">
          <p class="text-3xl">{{ user.email }}</p>
          <ul class="flex justify-center">
            <li class="mr-2 text-pgray-medium">My Profile</li>
            <li>
              <Button
                text="Logout"
                type="text"
                @click="
                  $emit('logout')
                  $emit('toggleDrawer')
                "
              />
            </li>
          </ul>
        </header>
        <nav class="p-4r flex justify-center">
          <ul>
            <li @click="$emit('toggleDrawer')">
              <nuxt-link to="notes">All</nuxt-link>
            </li>

            <li
              v-for="(tag, key) in tags"
              :key="key"
              class="mt-2r"
              @click="$emit('toggleDrawer')"
            >
              <nuxt-link
                :to="`notes?tag=${tag}`"
                class="flex items-center justify-between"
              >
                {{ tag }}
                <span
                  class="ml-2 bg-pblue-dark text-white rounded-full h-3 w-3 flex items-center justify-center"
                  >{{ getAmount(tag) }}</span
                ></nuxt-link
              >
            </li>
          </ul>
        </nav>
      </aside>
    </transition>
    <transition name="fade">
      <div
        v-if="isActive"
        class="bg-pgray-drawer w-screen h-screen fixed top-0 left-0 z-40"
        @click="$emit('toggleDrawer')"
      ></div>
    </transition>
  </section>
</template>

<script>
import Button from '@/components/_Button'

export default {
  components: {
    Button
  },
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: false,
      default: () => {}
    },
    items: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  computed: {
    availableTags() {
      return this.items.flatMap((item) => item.tags).map((item) => item.text)
    },

    tags() {
      return this.availableTags.filter(
        (item, pos, arr) => arr.indexOf(item) === pos
      )
    }
  },

  methods: {
    getAmount(tag) {
      return this.availableTags.filter((item) => item === tag).length
    },
    handleOutsideClick(event) {
      // eslint-disable-next-line no-console
      console.log(event)
    }
  }
}
</script>
