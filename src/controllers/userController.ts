import { Request, Response } from 'express'
import { UserService } from '../services/userService'

// Handles request-response logic and validates data.
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all admins
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers()
      return res.json(users)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching admins.', error })
    }
  }

  // Get specific user
  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const user = await this.userService.getUserById(id)
      if (!user) return res.status(404).json({ message: 'User not found.' })
      return res.json(user)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching user.', error })
    }
  }

  // Create user
  createUser = async (req: Request, res: Response) => {
    try {
      const { username, password, role } = req.body
      const newUser = await this.userService.createUser({ username, password, role })
      return res.status(201).json({ message: 'User created.', newUser })
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user.', error })
    }
  }
}
