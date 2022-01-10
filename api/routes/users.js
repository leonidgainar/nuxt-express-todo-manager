import { Router } from 'express'
import controllers from '../controllers/usersController'

const router = Router()

// /api/users
router.route('/').get(controllers.getMany).post(controllers.createOne)

// /api/users/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

// /api/users/addTask/:id
router.route('/addTask/:id').put(controllers.addTaskToUser)

// /api/users/deleteTask/:id
router.route('/deleteTask/:id').put(controllers.deleteTaskFromUser)

module.exports = router
