import ApiError from '../../../Errors/api.errors'
import config from '../../../config/index'
import { generateUserId } from './user.utils'
import { IUser } from './user.interface'
import { User } from './user.model'

/**
*create user*

**auto generated incremantal id
**default password
 */

const createUsers = async (user: IUser): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_student_password as string
  }

  //auto generated incremantal id

  const id = await generateUserId()
  user.id = id

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Faield to created user')
  }
  return createdUser
}

export const UserService = {
  createUsers,
}
