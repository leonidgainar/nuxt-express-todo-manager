import { crudControllers } from '../utils/crud'
import { Task } from '../models/Task'

const unassignTasksFromUser = async (req, res) => {
  try {
    const updatedTasks = await Task.updateMany(
      { _id: { $in: req.body.tasks } },
      { assignedTo: '' },
      { new: true }
    )
      .lean()
      .exec()

    if (!updatedTasks) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedTasks })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export default { unassignTasksFromUser, ...crudControllers(Task) }
