import { crudControllers } from '../utils/crud'
import { Task } from '../models/Task'

const unassignTasksFromUser = async (req, res) => {
  try {
    await req.body.tasks.forEach(async (taskId) => {
      const updatedTask = await Task.findOneAndUpdate(
        {
          _id: taskId,
          assignedTo: req.body.userId,
        },
        { assignedTo: '' },
        { new: true }
      )
        .lean()
        .exec()

      if (!updatedTask) {
        return res.status(400).end()
      }
    })
    res.status(200).end()
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export default { unassignTasksFromUser, ...crudControllers(Task) }
