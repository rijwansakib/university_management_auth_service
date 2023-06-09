import { User } from './users.model'

// find last user from db

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

export const generateUserId = async () => {
  const currentID = (await findLastUserId()) || (0).toString().padStart(5, '0')

  const incrementID = (parseInt(currentID) + 1).toString().padStart(5, '0')

  return incrementID
}
