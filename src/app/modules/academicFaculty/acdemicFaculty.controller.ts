import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicFaculty } from './acdemicFaculty.interface'
import httpStatus from 'http-status'
import { AcademicFacultyService } from './acdemicFaculty.service'
import pick from '../../../shared/pick'
import { academicFacultyFilterableFields } from './acdemicFaculty.constants'
import { paginationFields } from '../../../constants/pagination'

//create  Faaculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body
  const result = await AcademicFacultyService.createFaculty(academicFacultyData)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create Faculty successfully',
    data: result,
  })
})

//get single faculty

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicFacultyService.getSingleFaculty(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get faculty Single Data successfully',
    data: result,
  })
})

//get all faculty

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Faculty Data successfully',
    meta: result.meta,
    data: result.data,
  })
})

// update faculty

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updateData = req.body

  const result = await AcademicFacultyService.updateFaculty(id, updateData)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty update Successfully',
    data: result,
  })
})

//Delete Faculty

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicFacultyService.deleteByIdFromDB(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty deleted successfully',
    data: result,
  })
})

export const AcademicFacultyController = {
  createFaculty,
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
}
