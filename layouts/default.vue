<template>
  <v-app id="protodo" dark>
    <v-app-bar app flat height="64px">
      <v-container class="py-0 fill-height">
        <v-container v-if="$session.isLoggedIn()">
          <v-avatar class="mr-10" color="grey darken-1" size="36">{{ userShortname }}</v-avatar>
          <strong style="margin-left: -2rem; margin-right: 2rem">{{ $session.user.username }}</strong>
          <v-btn text @click="logout">logout</v-btn>
        </v-container>

        <v-container v-else>
          <v-btn text color="primary" :to="{ path: '/login' }">login</v-btn>
          <v-btn outlined color="primary" :to="{ path: '/register' }">register</v-btn>
        </v-container>

        <div style="min-width: 36px; min-height: 44px; height: 100%; padding: 0.4rem 0; margin-left: -4rem">
          <nuxt-link :to="{ path: '/' }"><img :src="logo" alt="logo" style="height: 100%; min-height: 44px" /> </nuxt-link>
        </div>
      </v-container>

    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  computed: {
    userShortname() {
      if (!this.$session.user.username) return ''
      return this.$session.user.username.substring(0, 2).toUpperCase()
    },
    logo() {
      return require('~/assets/images/logo.png')
    }
  },
  methods: {
    logout() {
      this.$session.logout()
      this.$router.replace({ path: '/login' })
    }
  }
}
</script>
