import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IStudent } from './student.interface'
import { studentFilterableFields } from './student.constant'
import { studentService } from './student.service'

// //single semester

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await studentService.getSingleStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Student fetched successfully !',
    data: result,
  })
})

//get semester

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await studentService.getAllStudent(filters, paginationOptions)
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Get  All  Student  successfuylly',
    meta: result.meta,
    data: result.data,
  })
})

// update semester

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await studentService.updateStudent(id, updatedData)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  })
})

//delete semester

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await studentService.deleteStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully !',
    data: result,
  })
})

export const studentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
