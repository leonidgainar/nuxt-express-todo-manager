<template>
  <div class="w-full max-w-xl py-8 px-4 text-center">
    <h1 class="text-2xl font-bold">Add new task</h1>
    <ValidationObserver v-slot="{ handleSubmit }" ref="addTaskForm">
      <form class="form" @submit.prevent="handleSubmit(addNewTask)">
        <div class="mb-4">
          <ValidationProvider
            v-slot="{ errors }"
            :rules="{
              required: true,
              min: 4,
              max: 64,
              is_unique: [getTasksTitle],
            }"
          >
            <label for="title" class="form-label"> Title </label>
            <input
              id="title"
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
          <label for="complete" class="form-label">
            <input
              id="complete"
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
          <label for="assignedTo" class="form-label"> Assigned to </label>
          <select
            id="assignedTo"
            v-model="assignedTo"
            name="assignedTo"
            class="select"
          >
            <option value="" disabled>-- None --</option>
            <option v-for="user in users" :key="user.id" :value="user._id">
              {{ user.name }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn-primary">Add task</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateUsers, mapActions: mapActionsUsers } =
  createNamespacedHelpers('users')
const { mapGetters: mapGettersTasks, mapActions: mapActionsTasks } =
  createNamespacedHelpers('tasks')

export default {
  name: 'TaskForm',

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data() {
    return {
      title: '',
      complete: false,
      assignedTo: '',
    }
  },

  computed: {
    ...mapStateUsers(['users']),
    ...mapGettersTasks(['getTasksTitle']),
  },

  methods: {
    ...mapActionsTasks(['addTask']),
    ...mapActionsUsers(['addTaskToUser']),

    addNewTask() {
      this.addTask({
        title: this.title,
        complete: this.complete,
        assignedTo: this.assignedTo,
      }).then((response) => {
        if (response.assignedTo !== '') {
          this.addTaskToUser({
            userId: response.assignedTo,
            taskId: response._id,
          })
        }
      })

      this.title = ''
      this.complete = false
      this.assignedTo = ''
      this.$nextTick(() => {
        this.$refs.addTaskForm.reset()
      })
    },
  },
}
</script>

<style scoped></style>
