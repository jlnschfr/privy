<template>
  <form
    ref="form"
    class="max-w-md mx-auto mt-4r p-4r text-pblue-medium shadow-xl bg-white"
    @submit.prevent="authenticate"
  >
    <header>
      <h2 class="text-3xl lg:text-4xl">Login</h2>
    </header>

    <Input
      placeholder="mail"
      type="email"
      class="mt-4"
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

    <Button type="submit" visual="true" class="w-full mt-6">{{
      !isLogin ? 'Register' : 'Login'
    }}</Button>

    <p class="mt-4 text-pblue-medium text-center">
      <span
        v-text="!isLogin ? 'Already got an account?' : 'Dont have an account?'"
      ></span>
      <Button type="button" @click="isLogin = !isLogin">{{
        isLogin ? 'Register' : 'Login'
      }}</Button>
    </p>
    <p class="mt-4 text-sm text-porange-dark text-center">{{ error }}</p>
  </form>
</template>

<script>
import Input from '@/components/_Input'
import Button from '@/components/_Button'

export default {
  components: {
    Input,
    Button
  },

  data() {
    return {
      isLogin: true,
      email: '',
      password: '',
      repeatedPassword: '',
      error: '',
      myInput: ''
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
