import { Request, RequestHandler, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'

// create student

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body
    const result = await UserService.createStudent(student, userData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student  create successfuylly',
      data: result,
    })
  }
)

// create Faculty
const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body
    const result = await UserService.createFaculty(faculty, userData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty  create successfuylly',
      data: result,
    })
  }
)

//create Admin
const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body
    const result = await UserService.createAdmin(admin, userData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin  create successfuylly',
      data: result,
    })
  }
)

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
}
