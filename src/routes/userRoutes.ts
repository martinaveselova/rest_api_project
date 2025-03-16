import { Router } from 'express'
import { UserController } from '../controllers/userController'
import { UserService } from '../services/userService'

const userRoutes = Router()
const userService = new UserService()
const userController = new UserController(userService)

userRoutes.get('/user', userController.getAllUsers)
userRoutes.get('/user/:id', userController.getUserById)
userRoutes.post('/user', userController.createUser)
/*userRoutes.put('/user/:id', userController.updateUser)
userRoutes.delete('/user/:id', userController.deleteUser)*/

export default userRoutes
