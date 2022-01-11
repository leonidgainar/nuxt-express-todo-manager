import api from '@/services/api'

export default {
  getTasks() {
    return api.get(`tasks`).then((response) => response.data)
  },
  getTaskById(taskId) {
    return api.get(`tasks/${taskId}`).then((response) => response.data)
  },
  createTask(payload) {
    return api.post(`tasks/`, payload).then((response) => response.data)
  },
  updateTask(payload) {
    return api
      .put(`tasks/${payload._id}`, payload)
      .then((response) => response.data)
  },
  deleteTask(taskId) {
    return api.delete(`tasks/${taskId}`).then((response) => response.data)
  },
  unassignTasksFromUser(payload) {
    return api.put(`tasks/`, payload).then((response) => response.data)
  },
}
