<template>
  <PrivyAuthForm />
</template>

<script>
import PrivyAuthForm from '@/components/PrivyAuthForm'

export default {
  layout: 'auth',
  transition: 'slide',
  components: {
    PrivyAuthForm
  }
}
</script>
