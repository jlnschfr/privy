<template>
  <form
    ref="form"
    class="max-w-sm mx-auto mt-10 bg-pgray-light p-4 shadow-xl"
    @submit.prevent="authenticate"
  >
    <header>
      <h2 class="font-semibold text-2xl">Login</h2>
    </header>

    <Input
      placeholder="user"
      type="email"
      @focus="error = ''"
      @input="email = $event.value"
    />

    <Input
      placeholder="password"
      type="password"
      @focus="error = ''"
      @input="password = $event.value"
    />

    <Input
      v-if="!isLogin"
      placeholder="repeat password"
      type="password"
      @focus="error = ''"
      @input="repeatedPassword = $event.value"
    />

    <Button
      class="mt-4"
      :text="!isLogin ? 'Register' : 'Login'"
      classes="w-full"
    />

    <p class="mt-4 text-pgray-dark text-center">
      <span
        v-text="
          !isLogin ? 'Already got an account?' : 'Doesnt have an account?'
        "
      ></span>
      <span
        class="underline"
        @click="isLogin = !isLogin"
        v-text="!isLogin ? 'Login' : 'Register'"
      ></span>
    </p>
    <p class="mt-4 text-sm text-red-500 text-center">{{ error }}</p>
  </form>
</template>

<script>
import Input from '@/components/Input'
import Button from '@/components/Button'

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
