import { Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
const createUsers = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body
  const result = await UserService.createUsers(user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user  create successfuylly',
    data: result,
  })
})

export const UserController = {
  createUsers,
}
