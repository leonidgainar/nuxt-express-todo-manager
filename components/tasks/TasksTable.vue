<template>
  <div class="min-w-full sm:px-6 lg:px-4">
    <div v-if="tasks.length">
      <h1 class="text-2xl font-bold">Tasks</h1>
      <table class="min-w-full table-container">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in tableHeaders"
              :key="header"
              class="table-header"
            >
              {{ header }}
            </th>

            <th class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="task in tasks" :key="task._id">
            <td class="px-6 py-4 text-left">
              {{ task.title }}
            </td>
            <td class="px-6 py-4 text-left">
              <span v-if="getUserById(task.assignedTo)">
                {{ getUserById(task.assignedTo).name }}
              </span>
              <span v-else> N/A </span>
            </td>
            <td class="py-4 text-left">
              <TaskStatusLabel :status="task.complete" />
            </td>
            <td class="px-6 py-4 text-right text-xs">
              <button class="btn-primary" @click="editTask(task)">Edit</button>
              <button
                class="btn-danger ml-2 mt-2 md:mt-0"
                @click="deleteAndUnassignTask(task)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <TaskEditModal
      v-bind="{
        showModal: showEditModal,
        taskId: currentTask._id,
        taskTitle: currentTask.title,
        taskAssignedTo: currentTask.assignedTo,
        taskComplete: currentTask.complete,
      }"
      @close-task-modal="closeEditModal()"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import TaskStatusLabel from '../tasks/TaskStatusLabel.vue'
import TaskEditModal from '../tasks/TaskEditModal.vue'

const { mapState: mapStateTasks, mapActions: mapActionsTasks } =
  createNamespacedHelpers('tasks')
const { mapGetters: mapGettersUsers, mapActions: mapActionsUsers } =
  createNamespacedHelpers('users')

export default {
  name: 'TasksTable',
  components: {
    TaskStatusLabel,
    TaskEditModal,
  },

  data() {
    return {
      tableHeaders: ['title', 'assigned to', 'status'],
      currentTask: {
        _id: '',
        title: '',
        assignedTo: '',
        complete: false,
      },
      showEditModal: false,
    }
  },

  computed: {
    ...mapStateTasks(['tasks']),
    ...mapGettersUsers(['getUserById']),
  },

  created() {
    this.getTasks()
  },

  methods: {
    ...mapActionsTasks(['getTasks', 'deleteTask']),
    ...mapActionsUsers(['deleteTaskFromUser']),

    deleteAndUnassignTask(task) {
      this.deleteTask(task._id)
      if (task.assignedTo) {
        this.deleteTaskFromUser({ taskId: task._id, userId: task.assignedTo })
      }
    },

    editTask(task) {
      this.currentTask = task
      this.showEditModal = true
    },

    closeEditModal() {
      this.currentTask = {}
      this.showEditModal = false
    },
  },
}
</script>
