import { Router } from 'express'
import controllers from '../controllers/tasksController'

const router = Router()

// /api/tasks
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)
  .put(controllers.unassignTasksFromUser)

// /api/tasks/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

module.exports = router
