<template>
  <v-card :loading="loading">
    <v-card-text>Login</v-card-text>
    <v-container>
      <center>
        <v-col sm="6">
          <v-text-field v-model="username" label="username" outlined clearable required></v-text-field>
        </v-col>
        <v-col sm="6">
          <v-text-field v-model="password" label="password" outlined clearable required
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" @keypress.enter="login" @click:append="show1 = !show1"></v-text-field>
        </v-col>

        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="login">Login</v-btn>
        <v-col sm="6">
          <v-alert v-if="response" dense outlined :type="response.success ? 'success' : 'error'" style="margin-top: 2rem"> {{ response.msg }} </v-alert>
        </v-col>
      </center>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      show1: false,
      response: '',
      loading: false
    }
  },
  methods: {
    async login() {
      if (this.loading) return
      this.loading = true
      this.response = ''
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const res = await this.$api.login(this.username, this.password)
      this.response = res
      if (res.success) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        this.storeSession({ session: res.session, ...res.user })
        this.$router.replace({ path: '/' })
      }
      this.loading = false
    },
    storeSession(session) {
      this.$store.dispatch('session/setUser', {
        context: { $cookies: this.$cookies },
        user: session
      })
    }
  }
}
</script>
