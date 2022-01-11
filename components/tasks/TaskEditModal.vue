<template>
  <BaseModal :show-modal="showModal">
    <template #modal-title> Edit task </template>
    <template #modal-body>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(saveTask)">
          <div class="mb-4">
            <ValidationProvider
              v-slot="{ errors }"
              :rules="{
                required: true,
                min: 4,
                max: 64,
                is_unique: titleWasChanged ? [getTasksTitle] : false,
              }"
            >
              <label class="form-label" for="editedTitle"> Title </label>
              <input
                id="editedTitle"
                v-model.trim="title"
                name="title"
                type="text"
                placeholder="Enter the title"
                class="input-text"
              />
              <span class="text-red-600 text-sm">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="mb-4">
            <label for="status" class="form-label">
              <input
                id="status"
                v-model="complete"
                name="complete"
                type="checkbox"
                :value="true"
                class="mr-2"
              />
              <span class="text-sm"> Task completed </span>
            </label>
          </div>
          <div class="mb-4">
            <div class="mb-4">
              <label for="assignedTo" class="form-label"> Assigned to </label>
              <select
                id="assignedTo"
                v-model="assignedTo"
                name="assignedTo"
                class="select"
              >
                <option value="">-- None --</option>
                <option v-for="user in users" :key="user._id" :value="user._id">
                  {{ user.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="bg-white py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="submit" class="btn-primary ml-2">Save</button>
            <button
              type="reset"
              class="btn-secondary"
              @click="$emit('close-task-modal')"
            >
              Cancel
            </button>
          </div>
        </form>
      </ValidationObserver>
    </template>
  </BaseModal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import BaseModal from '../BaseModal.vue'

const { mapState: mapStateUsers, mapActions: mapActionsUsers } =
  createNamespacedHelpers('users')
const { mapGetters: mapGettersTasks, mapActions: mapActionsTasks } =
  createNamespacedHelpers('tasks')

export default {
  components: {
    BaseModal,
    ValidationObserver,
    ValidationProvider,
  },

  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    taskId: {
      type: String,
      default: '',
    },
    taskTitle: {
      type: String,
      default: '',
    },
    taskAssignedTo: {
      type: String,
      default: '',
    },
    taskComplete: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      title: '',
      assignedTo: '',
      complete: false,
    }
  },

  computed: {
    ...mapStateUsers(['users']),
    ...mapGettersTasks(['getTasksTitle']),

    titleWasChanged() {
      return this.title !== this.taskTitle
    },
  },

  watch: {
    taskTitle() {
      this.title = this.taskTitle
    },
    taskAssignedTo() {
      this.assignedTo = this.taskAssignedTo
    },
    taskComplete() {
      this.complete = this.taskComplete
    },
  },

  methods: {
    ...mapActionsTasks(['editTask']),
    ...mapActionsUsers(['addTaskToUser', 'deleteTaskFromUser']),

    changeTaskAssignedUser() {
      if (this.taskAssignedTo !== '') {
        this.deleteTaskFromUser({
          userId: this.taskAssignedTo,
          taskId: this.taskId,
        })
      }
      if (this.assignedTo !== '') {
        this.addTaskToUser({ userId: this.assignedTo, taskId: this.taskId })
      }
    },

    saveTask() {
      const updatedTask = {
        _id: this.taskId,
        title: this.title,
        assignedTo: this.assignedTo,
        complete: this.complete || false,
      }

      this.editTask(updatedTask)

      if (this.assignedTo !== this.taskAssignedTo) {
        this.changeTaskAssignedUser()
      }

      this.$emit('close-task-modal')
    },
  },
}
</script>
