import api from '@/services/api'

export default {
  getUsers() {
    return api.get(`users`).then((response) => response.data)
  },
  getUserById(userId) {
    return api.get(`users/${userId}`).then((response) => response.data)
  },
  createUser(payload) {
    return api.post(`users/`, payload).then((response) => response.data)
  },
  updateUser(payload) {
    return api
      .put(`users/${payload._id}`, payload)
      .then((response) => response.data)
  },
  deleteUser(userId) {
    return api.delete(`users/${userId}`).then((response) => response.data)
  },
  addTaskToUser(payload) {
    return api
      .put(`users/addTask/${payload.userId}`, payload)
      .then((response) => response.data)
  },
  deleteTaskFromUser(payload) {
    return api
      .put(`users/deleteTask/${payload.userId}`, payload)
      .then((response) => response.data)
  },
}
