const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
  },
  complete: {
    type: Boolean,
  },
})

taskSchema.index({ title: 1 }, { unique: true })
export const Task = mongoose.model('task', taskSchema)
