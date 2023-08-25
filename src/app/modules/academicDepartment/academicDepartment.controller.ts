import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'
import httpStatus from 'http-status'
import { academicDepartmentFilterableFields } from './academicDepartment.constants'
import { paginationFields } from '../../../constants/pagination'
import pick from '../../../shared/pick'
import { AcademicDepartmentService } from './academicDepartment.service'

//create Department
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  )

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department created successfully',
    data: result,
  })
})

// get Single department

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.getSingleDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Department successfully',
    data: result,
  })
})

//get all department

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  )
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Department successfully',
    meta: result.meta,
    data: result.data,
  })
})

// update Department

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.updateDepartment(id, req.body)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Department successfully',
    data: result,
  })
})

//deleteDepartment

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.deleteDepartment(id)
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Department successfully',
    data: result,
  })
})

export const AcademicDepartmentController = {
  createDepartment,
  getSingleDepartment,
  getAllDepartment,
  updateDepartment,
  deleteDepartment,
}
