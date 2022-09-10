const axios = require('axios')

export default function ({ store, app }, inject) {
  const endpoint = 'http://localhost:8080/api/v1'

  const sendRequestAsync = async (payload) => {
    try {
      return await axios(payload)
    } catch (e) {
      if (e.response) return e.response
      console.log('[API] Error:', e)
      return null
    }
  }

  const createPayload = (path, data, method = 'POST', sesion = '') => {
    return {
      url: `${endpoint}${path}`,
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `jwt ${sesion}`
      },
      data: {
        ...data
      }
    }
  }

  const api = {
    async login(username, password) {
      const payload = createPayload('/user/login', { username, password })
      const response = await sendRequestAsync(payload)
      if (response) return response.data
    },
    async register(username, password) {
      const payload = createPayload('/user/register', { username, password })
      const response = await sendRequestAsync(payload)
      if (response) return response.data
    },
    async getLists() {
      const user = store.state.session.user
      const payload = createPayload('/list', {}, 'GET', user.session)
      const response = await sendRequestAsync(payload)
      if (response) return response.data
    },
    async addList(listName) {
      const user = store.state.session.user
      const payload = createPayload('/list', { listName }, 'POST', user.session)
      const response = await sendRequestAsync(payload)
      if (response) return response.data
    },
    async editList(listId, listName) {
      const user = store.state.session.user
      const payload = createPayload('/list', { listId, listName }, 'PUT', user.session)
      const response = await sendRequestAsync(payload)
      if (response) return response.data
    },
    async delList(listId) {
      const user = store.state.session.user
      const payload = createPayload('/list', { listId }, 'DELETE', user.session)
      const response = await sendRequestAsync(payload)
      if (response) return response.data
    },
    async getTodos(listId) {
      const user = store.state.session.user
      const payload = createPayload('/list/view', { listId }, 'POST', user.session)
      const response = await sendRequestAsync(payload)
      if (response) return response.data
    },
    async addTodo(todoName, listId, description = "", completed) {
      const user = store.state.session.user
      const payload = createPayload('/todo', { todoName, listId, description, completed }, 'POST', user.session)
      const response = await sendRequestAsync(payload)
      if (response) return response.data
    },
    async delTodo(todoId) {
      const user = store.state.session.user
      const payload = createPayload('/todo', { todoId }, 'DELETE', user.session)
      const response = await sendRequestAsync(payload)
      if (response) return response.data
    },
    async editTodo(todoId, todoName, description = "", completed) {
      const user = store.state.session.user
      const payload = createPayload('/todo/edit', { todoId, todoName, description, completed }, 'PUT', user.session)
      const response = await sendRequestAsync(payload)
      if (response) return response.data
    },
    async markTodo(todoId, completed) {
      const user = store.state.session.user
      const payload = createPayload('/todo', { todoId, completed }, 'PUT', user.session)
      const response = await sendRequestAsync(payload)
      if (response) return response.data
    }
  }

  inject('api', api)
}
