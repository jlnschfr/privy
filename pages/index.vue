<template>
  <PrivyAuthForm />
</template>

<script>
export default {
  components: {
    PrivyAuthForm: () => import('@/components/PrivyAuthForm'),
  },
  layout: 'blank',
}
</script>
