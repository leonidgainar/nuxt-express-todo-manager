import taskService from '~/services/taskService'

export const state = () => ({
  tasks: [],
})

export const getters = {
  getTaskById: (state) => (id) => {
    return state.tasks.find(({ _id }) => _id === id)
  },
  getTasksTitle: (state) => {
    return state.tasks.map(({ title }) => title)
  },
}

export const actions = {
  getTasks({ commit }) {
    taskService.getTasks().then((response) => {
      commit('setTasks', response.data)
    })
  },

  addTask({ commit }, task) {
    return taskService.createTask(task).then((response) => {
      commit('addTask', response.data)
      return response.data
    })
  },

  deleteTask({ commit }, taskId) {
    taskService.deleteTask(taskId).then(() => {
      commit('deleteTask', taskId)
    })
  },

  editTask({ commit }, updatedTask) {
    taskService.updateTask(updatedTask).then((response) => {
      commit('editTask', response.data)
    })
  },

  unassignTasksFromUser({ commit }, payload) {
    taskService.unassignTasksFromUser(payload).then(() => {
      commit('unassignTasksFromUser', payload)
    })
  },
}

export const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks
  },

  addTask(state, task) {
    state.tasks.push({ ...task })
  },

  deleteTask(state, taskId) {
    state.tasks = state.tasks.filter((task) => task._id !== taskId)
  },

  editTask(state, updatedTask) {
    const taskIndex = state.tasks.findIndex(
      (task) => task._id === updatedTask._id
    )
    if (taskIndex !== -1) {
      state.tasks[taskIndex] = updatedTask
    }
    state.tasks = [...state.tasks]
  },

  unassignTasksFromUser(state, payload) {
    const { userId, tasks } = payload
    state.tasks = state.tasks.map((task) => {
      if (tasks.includes(task._id) && task.assignedTo === userId) {
        task.assignedTo = ''
      }
      return task
    })
  },
}
