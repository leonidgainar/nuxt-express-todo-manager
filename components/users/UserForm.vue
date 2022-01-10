<template>
  <div class="w-full max-w-xl py-8 px-4 text-center">
    <h1 class="text-2xl font-bold">Add new user</h1>
    <ValidationObserver v-slot="{ handleSubmit }" ref="addUserForm">
      <form class="form" @submit.prevent="handleSubmit(addNewUser)">
        <div class="mb-4">
          <label class="form-label" for="name"> Name </label>
          <ValidationProvider
            v-slot="{ errors }"
            :rules="{ required: true, min: 3, is_unique: [getUsersName] }"
          >
            <input
              id="name"
              v-model.trim="name"
              type="text"
              name="name"
              placeholder="Enter the name"
              class="input-text"
            />
            <span class="text-red-600 text-sm">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <button type="submit" class="btn-primary">Add user</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('users')

export default {
  name: 'UserForm',

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data() {
    return {
      name: '',
    }
  },

  computed: {
    ...mapGetters(['getUsersName']),
  },

  methods: {
    ...mapActions(['addUser']),

    addNewUser() {
      this.addUser({ name: this.name, tasks: [] })

      this.name = ''
      this.$nextTick(() => {
        this.$refs.addUserForm.reset()
      })
    },
  },
}
</script>

<style scoped></style>
