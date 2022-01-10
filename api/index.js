const express = require('express')
const mongoose = require('mongoose')

// DB connection
mongoose.connect('mongodb://localhost:27017/todo-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', function callback() {
  console.log('MongoDB Connected...')
})

// Create express instnace
const app = express()

// Init body-parser options (inbuilt with express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Require & Import API routes
const users = require('./routes/users')
const tasks = require('./routes/tasks')

// Use API Routes
app.use('/users', users)
app.use('/tasks', tasks)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
