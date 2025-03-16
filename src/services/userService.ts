import { AppDataSource } from '../data-source'
import { User, UserRole } from '../entities/user'
import { Repository } from 'typeorm'

// Handles database logic and interactions with the repository.
export class UserService {
  userRepo: Repository<User>

  constructor() {
    this.userRepo = AppDataSource.getRepository(User)
  }

  async getAllUsers() {
    return await this.userRepo.find()
  }

  async getUserById(id: string) {
    return await this.userRepo.findOne({
      where: {
        id: id,
      },
    })
  }

  async createUser(data: { username: string; password: string; role: UserRole }) {
    const newUser = this.userRepo.create(data)
    return await this.userRepo.save(newUser)
  }
}
