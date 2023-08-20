import { Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.Service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { academicSemesterFilterableFields } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
// create semester
const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  )

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester create successfuylly',
    data: result,
  })
})

// //single semester

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.getSingleSemester(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester fetched successfully !',
    data: result,
  })
})

//get semester

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicSemesterService.getAllSemester(
    filters,
    paginationOptions
  )
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Get  All  Semester  successfuylly',
    meta: result.meta,
    data: result.data,
  })
})

// update semester

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await AcademicSemesterService.updateSemester(id, updatedData)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester updated successfully',
    data: result,
  })
})

//delete semester

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.deleteSemester(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester deleted successfully !',
    data: result,
  })
})

export const AcademicSemestercontroller = {
  createSemester,
  getSingleSemester,
  getAllSemester,
  updateSemester,
  deleteSemester,
}
