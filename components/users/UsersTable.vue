<template>
  <div class="min-w-full sm:px-6 lg:px-6">
    <div v-if="users.length">
      <h1 class="text-2xl font-bold">Users</h1>
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
          <tr v-for="user in users" :key="user._id">
            <td class="px-6 py-4 text-left align-top">
              <span :title="user.name">
                {{ truncateText(user.name) }}
              </span>
            </td>
            <td class="px-6 py-4 text-left align-top">
              <div
                v-for="task in user.tasks"
                :key="task"
                class="flex justify-between text-gray-900 mb-2"
              >
                <span v-if="getTaskById(task)" :title="getTaskById(task).title">
                  {{ truncateText(getTaskById(task).title) }}
                </span>
                <TaskStatusLabel
                  v-if="getTaskById(task)"
                  :status="getTaskById(task).complete"
                />
              </div>
            </td>
            <td class="px-6 py-4 align-top text-right text-xs">
              <button class="btn-primary mb-2" @click="editUser(user)">
                Edit
              </button>
              <button
                class="btn-danger ml-2"
                @click="deleteUserAndUnassignTask(user)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <UserEditModal
      v-bind="{
        showModal: showEditModal,
        userId: currentUser._id,
        userName: currentUser.name,
        userTasks: currentUser.tasks,
      }"
      @close-user-modal="closeEditModal()"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import stringHelpers from '../../utils/stringHelpers'

import TaskStatusLabel from '../tasks/TaskStatusLabel.vue'
import UserEditModal from '../users/UserEditModal.vue'

const { mapState: mapStateUsers, mapActions: mapActionsUsers } =
  createNamespacedHelpers('users')
const { mapGetters: mapGettersTasks, mapActions: mapActionsTasks } =
  createNamespacedHelpers('tasks')

export default {
  name: 'UsersTable',
  components: {
    TaskStatusLabel,
    UserEditModal,
  },

  data() {
    return {
      tableHeaders: ['name', 'tasks'],
      currentUser: {
        _id: '',
        name: '',
        tasks: [],
      },
      showEditModal: false,
    }
  },

  computed: {
    ...mapStateUsers(['users']),
    ...mapGettersTasks(['getTaskById']),
  },

  created() {
    this.getUsers()
  },

  methods: {
    ...mapActionsUsers(['getUsers', 'deleteUser']),
    ...mapActionsTasks(['unassignTasksFromUser']),

    deleteUserAndUnassignTask(user) {
      this.deleteUser(user._id)
      if (user.tasks.length) {
        this.unassignTasksFromUser({ userId: user._id, tasks: user.tasks })
      }
    },

    editUser(user) {
      this.currentUser = user
      this.showEditModal = true
    },

    closeEditModal() {
      this.currentUser = {}
      this.showEditModal = false
    },

    truncateText(text, length = 20) {
      return stringHelpers.truncate(text, length, '...')
    },
  },
}
</script>
