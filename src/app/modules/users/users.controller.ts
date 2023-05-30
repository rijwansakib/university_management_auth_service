import { Request, Response } from 'express'
import usersService from './users.service'
const createUsers = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await usersService.createUsers(user)
    res.status(200).json({
      status: 'success',
      message: 'users data create successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'users data create faield',
    })
  }
}

export default {
  createUsers,
}
