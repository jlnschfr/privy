<template>
  <form
    ref="form"
    class="max-w-md mx-auto px-3 md:px-6 py-8 shadow-xl bg-white absolute left-4vw right-4vw top-50 transform -translate-y-1/2"
    @submit.prevent="authenticate"
  >
    <header class="flex justify-center">
      <PrivyIcon class="w-5" />
    </header>

    <Input
      placeholder="mail"
      type="email"
      class="mt-8"
      @focus="error = ''"
      @input="email = $event"
    />

    <Input
      placeholder="password"
      type="password"
      class="mt-4"
      @focus="error = ''"
      @input="password = $event"
    />

    <Input
      v-if="!isLogin"
      placeholder="repeat password"
      type="password"
      class="mt-4"
      @focus="error = ''"
      @input="repeatedPassword = $event"
    />

    <Button type="submit" class="w-full mt-6">{{
      !isLogin ? 'Register' : 'Login'
    }}</Button>

    <p class="mt-6 text-center">
      <span
        v-text="!isLogin ? 'Already got an account?' : 'Dont have an account?'"
      ></span>
      <button type="button" @click="isLogin = !isLogin">
        {{ isLogin ? 'Register now' : 'Login' }}
      </button>
    </p>
    <p v-if="error" class="mt-4 text-sm text-secondary-500 text-center">
      {{ error }}
    </p>
  </form>
</template>

<script>
import Button from '@/components/_Button'
import Input from '@/components/_Input'
import PrivyIcon from '@/assets/svg/privy.svg'

export default {
  components: {
    Button,
    Input,
    PrivyIcon
  },

  data() {
    return {
      isLogin: true,
      email: '',
      password: '',
      repeatedPassword: '',
      error: ''
    }
  },
  methods: {
    authenticate() {
      this.isLogin ? this.login() : this.register()
    },

    register() {
      if (this.password === this.repeatedPassword) {
        this.dispatchAuthenticateToStore('createUserWithEmailAndPassword')
      } else {
        this.error = 'Passwords are not equal'
      }
    },

    login() {
      this.dispatchAuthenticateToStore('loginWithEmailAndPassword')
    },

    dispatchAuthenticateToStore(method) {
      this.$store
        .dispatch(method, {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$refs.form.reset()
        })
        .catch((e) => {
          this.error = e.message
        })
    }
  }
}
</script>
