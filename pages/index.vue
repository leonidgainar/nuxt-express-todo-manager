<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="flex justify-center">
        <UserForm />
      </div>
      <div class="flex justify-center">
        <client-only>
          <TaskForm />
        </client-only>
      </div>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-2">
      <div class="flex justify-center mt-4">
        <client-only>
          <UsersTable />
        </client-only>
      </div>
      <div class="flex justify-center mt-4">
        <client-only>
          <TasksTable />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import UserForm from '../components/users/UserForm.vue'
import TaskForm from '../components/tasks/TaskForm.vue'
import UsersTable from '../components/users/UsersTable.vue'
import TasksTable from '../components/tasks/TasksTable.vue'

export default {
  name: 'IndexPage',
  components: {
    UserForm,
    TaskForm,
    UsersTable,
    TasksTable,
  },
}
</script>
