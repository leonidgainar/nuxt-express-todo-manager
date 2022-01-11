import axios from 'axios'

export default axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: 'https://nuxt-express-todo-manager.herokuapp.com/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})
