export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    if (!user) {
      return
    }
    state.user = user
  },
  logOutUser(state) {
    state.user = null
  }
}

export const getters = {}

export const actions = {
  nuxtServerInit({ commit, state }, { $cookies, $api, req, $core }) {
    // Load session from cookie
    commit('setUser', $cookies.get('session') || null)
  },
  setUser(state, { context, user }) {
    // Set in vuex state
    state.commit('setUser', user)

    // Set in cookie
    const age = 7 // in days
    const today = new Date()
    context.$cookies.set('session', user, {
      path: '/',
      expires: new Date(today.getFullYear(), today.getMonth(), today.getDate() + age)
    })
  },
  removeUser(state, { context }) {
    state.commit('logOutUser')
    context.$cookies.remove('session')
    context.$asyncCache(null, null, true)
  }
}
