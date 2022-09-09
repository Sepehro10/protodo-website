export default function (context, inject) {
  const { store } = context
  const session = {
    get user() {
      const user = store.state.session.user
      return user || {}
    },
    set user(value) {
      store.dispatch('session/setUser', {
        context,
        user: value
      })
    },
    isLoggedIn() {
      return !!store.state.session.user
    },
    logout() {
      store.dispatch('session/removeUser', { context })
    }
  }

  inject('session', session)
}
