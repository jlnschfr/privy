<template>
  <div
    class="max-w-lg mx-auto px-3 md:px-6 py-8 shadow-xl bg-neutral-600 dark:bg-neutral-100"
  >
    <header>
      <h2 class="text-2xl font-bold leading-none hyphens-auto">
        Admin Panel
      </h2>
    </header>
    <form class="mt-8" @submit.prevent="updateEmail">
      <Input
        v-model="email"
        placeholder="mail"
        type="email"
        @focus="emailError = ''"
      />
      <Input
        v-model="password"
        placeholder="password"
        class="mt-4"
        type="password"
        @focus="emailError = ''"
      />

      <Button type="submit" class="w-full mt-6" :disabled="changeEmailDisabled">
        Change Email
      </Button>

      <p v-if="emailError" class="mt-4 text-sm text-secondary-500 text-center">
        {{ emailError }}
      </p>
    </form>
    <form class="mt-8" @submit.prevent="updatePassword">
      <Input
        v-model="password"
        placeholder="password"
        type="password"
        @focus="passwordError = ''"
      />

      <Input
        v-model="newPassword"
        placeholder="new password"
        type="password"
        class="mt-4"
        @focus="passwordError = ''"
      />

      <Input
        v-model="newRepeatedPassword"
        placeholder="repeat new password"
        type="password"
        class="mt-4"
        @focus="passwordError = ''"
      />

      <Button
        type="submit"
        class="w-full mt-6"
        :disabled="changePasswordDisabled"
      >
        Change Password
      </Button>

      <p
        v-if="passwordError"
        class="mt-4 text-sm text-secondary-500 text-center"
      >
        {{ passwordError }}
      </p>
    </form>
    <form class="mt-8" @submit.prevent="deleteAccount">
      <p>
        <strong>Caution Area:</strong> Deleting your account cannot be undone.
        Once your account has been deleted, it can't be recovered anymore. All
        notes are permanently lost.
      </p>

      <Input
        v-model="confirmDeleteWithMail"
        placeholder="confirm with your mail"
        type="text"
        class="mt-4"
        @focus="error = ''"
      />

      <Button
        secondary
        :disabled="confirmDeleteWithMail !== storedEmail"
        type="submit"
        class="w-full mt-4"
      >
        Delete Account
      </Button>

      <p v-if="error" class="mt-4 text-sm text-secondary-500 text-center">
        {{ error }}
      </p>
    </form>
  </div>
</template>

<script>
import Button from '@/components/_Button'
import Input from '@/components/_Input'

export default {
  components: {
    Button,
    Input
  },

  data() {
    return {
      storedEmail: '',
      email: '',
      password: '',
      newPassword: '',
      newRepeatedPassword: '',
      emailError: '',
      passwordError: '',
      confirmDeleteWithMail: '',
      error: ''
    }
  },

  computed: {
    changeEmailDisabled() {
      return (
        this.email === this.storedEmail ||
        !this.password ||
        Boolean(this.emailError)
      )
    },
    changePasswordDisabled() {
      return (
        !this.password ||
        !this.newPassword ||
        !this.newRepeatedPassword ||
        (this.password === this.newPassword &&
          this.password === this.newRepeatedPassword) ||
        Boolean(this.passwordError)
      )
    }
  },

  mounted() {
    this.storedEmail = this.$store.getters.getUser().email
    this.email = this.storedEmail
  },

  methods: {
    updateEmail() {
      this.dispatchToStore('updateEmail', {
        newEmail: this.email,
        password: this.password
      })
        .then(() => {
          this.showSnackbar('Email has been changed')
          this.storedEmail = this.$store.getters.getUser().email
        })
        .catch((e) => {
          this.emailError = e.message
        })
    },

    updatePassword() {
      if (this.newPassword === this.newRepeatedPassword) {
        this.dispatchToStore('updatePassword', {
          newPassword: this.newPassword,
          password: this.password
        })
          .then(() => {
            this.showSnackbar('Password has been changed')
            this.password = this.newPassword
            this.newPassword = ''
            this.newRepeatedPassword = ''
          })
          .catch((e) => {
            this.passwordError = e.message
          })
      } else {
        this.passwordError = 'New passwords are not equal'
      }
    },

    deleteAccount() {
      this.dispatchToStore('deleteAccount', { password: this.password })
        .then(() => {})
        .catch((e) => {
          this.error = e.message
        })
    },

    dispatchToStore(method, payload = {}) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch(method, payload)
          .then(() => {
            resolve()
          })
          .catch((e) => {
            reject(e)
          })
      })
    },

    showSnackbar(text) {
      this.$store.dispatch('showSnackbar', {
        text: text,
        action: 'OK',
        callback: () => {}
      })
    }
  }
}
</script>
