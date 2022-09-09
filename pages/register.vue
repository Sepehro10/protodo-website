<template>
  <v-card :loading="loading">
    <v-card-text>Register</v-card-text>
    <v-container>
      <center>
        <v-col sm="6">
          <v-text-field v-model="username" label="username" outlined clearable></v-text-field>
        </v-col>
        <v-col sm="6">
          <v-text-field v-model="password" label="password" outlined clearable @keypress.enter="register"></v-text-field>
        </v-col>

        <v-btn color="primary" larger width="12rem" :disabled="loading" @click="register">Register</v-btn>
        <v-alert v-if="response" dense outlined :type="response.success ? 'success' : 'error'" style="margin-top: 2rem"> {{ response.msg }} </v-alert>
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
      response: '',
      loading: false
    }
  },
  methods: {
    async register() {
      if (this.loading) return
      this.loading = true
      this.response = ''
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const res = await this.$api.register(this.username, this.password)
      if (res.code == 'P2002') {
        res.msg = `Field '${res.meta.target.join('" and"')}' already exists`
      }
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
