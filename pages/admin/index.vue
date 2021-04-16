<template>
  <PrivyAdmin />
</template>

<script>
export default {
  components: {
    PrivyAdmin: () => import('@/components/PrivyAdmin'),
  },
  layout: 'app',
  transition: 'slide',
}
</script>
