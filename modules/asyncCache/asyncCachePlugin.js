const LRU = require('lru-cache')
const cache = new LRU({
  max: 128 // limit items to 128
})

export default function ({ store }, inject) {
  const asyncCache = async (key, callback, reset = false) => {
    // Reset cache
    if (reset) {
      console.warn('[asyncCache] (LRU) Wiped cache')
      cache.clear()
      return
    }

    // Restore SSR Cache
    if (!process.server && store.state.asyncCache.ServerLRU) {
      for (const cacheItem of store.state.asyncCache.ServerLRU) {
        // console.warn(
        //   '[asyncCache] (Vuex -> LRU) Restoring SSR Cache:',
        //   cacheItem.key
        // )
        cache.set(cacheItem.key, cacheItem.payload)
      }
      store.commit('asyncCache/clearServerLRU')
    }

    // try to return cached payload
    const possibleCache = cache.get(key)

    if (typeof possibleCache != 'undefined') {
      return possibleCache
    }

    // execute callback
    const payload = await callback()

    // cache callback response
    if (process.server) {
      // store cache in vuex for SSR
      store.commit('asyncCache/appendServerLRU', { key, payload })
    } else {
      cache.set(key, payload)
    }

    return payload
  }

  inject('asyncCache', asyncCache)
}
