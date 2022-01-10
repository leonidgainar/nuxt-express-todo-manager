import { crudControllers } from '../utils/crud'
import { User } from '../models/User'

const addTaskToUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $push: { tasks: req.body.taskId } },
      { new: true }
    )
      .lean()
      .exec()

    if (!updatedUser) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedUser })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const deleteTaskFromUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $pull: { tasks: req.body.taskId } },
      { new: true }
    )
      .lean()
      .exec()

    if (!updatedUser) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedUser })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export default { addTaskToUser, deleteTaskFromUser, ...crudControllers(User) }
