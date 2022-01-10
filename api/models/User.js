const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array,
  },
})

userSchema.index({ name: 1 }, { unique: true })
export const User = mongoose.model('user', userSchema)
