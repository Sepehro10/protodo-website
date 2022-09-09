export const state = () => ({
  ServerLRU: new Set()
})

export const mutations = {
  setCache(state, { key, payload }) {
    state[key] = payload
  },
  appendServerLRU(state, data) {
    state.ServerLRU.add(data)
  },
  clearServerLRU(state) {
    state.ServerLRU = new Set()
  }
}

export const getters = {}

export const actions = {}
