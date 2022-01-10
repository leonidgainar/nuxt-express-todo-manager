import userService from '~/services/userService'

export const state = () => ({
  users: [],
})

export const getters = {
  getUserById: (state) => (id) => {
    return state.users.find((user) => user._id === id)
  },
  getUsersName: (state) => {
    return state.users.map(({ name }) => name)
  },
}

export const actions = {
  getUsers({ commit }) {
    userService.getUsers().then((response) => {
      commit('setUsers', response.data)
    })
  },

  addUser({ commit }, user) {
    userService.createUser(user).then((response) => {
      commit('addUser', response.data)
    })
  },

  deleteUser({ commit }, userId) {
    userService.deleteUser(userId).then(() => {
      commit('deleteUser', userId)
    })
  },

  editUser({ commit }, updatedUser) {
    userService.updateUser(updatedUser).then((response) => {
      commit('editUser', response.data)
    })
  },

  addTaskToUser({ commit }, payload) {
    userService.addTaskToUser(payload).then(() => {
      commit('addTaskToUser', payload)
    })
  },

  deleteTaskFromUser({ commit }, payload) {
    userService.deleteTaskFromUser(payload).then(() => {
      commit('deleteTaskFromUser', payload)
    })
  },
}

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },

  addUser(state, user) {
    state.users.push({ ...user })
  },

  deleteUser(state, userId) {
    state.users = state.users.filter((user) => user._id !== userId)
  },

  editUser(state, updatedUser) {
    const userIndex = state.users.findIndex(
      (user) => user._id === updatedUser._id
    )
    if (userIndex !== -1) {
      state.users[userIndex] = updatedUser
    }
    state.users = [...state.users]
  },

  addTaskToUser(state, payload) {
    const { userId, taskId } = payload
    const userIndex = state.users.findIndex((user) => user._id === userId)
    if (userIndex !== -1) {
      state.users[userIndex].tasks.push(taskId)
    }
  },

  deleteTaskFromUser(state, payload) {
    const { userId, taskId } = payload
    const userIndex = state.users.findIndex((user) => user._id === userId)
    if (userIndex !== -1) {
      state.users[userIndex].tasks = state.users[userIndex].tasks.filter(
        (task) => task !== taskId
      )
    }
  },
}
