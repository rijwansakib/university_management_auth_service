import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IFaculty } from './faculty.interface'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { facultyFilterableFields } from './faculty.constant'
import { paginationFields } from '../../../constants/pagination'
import { FacultyService } from './faculty.service'

//get single Faculty

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await FacultyService.getSingleFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Faculty Single Data successfully',
    data: result,
  })
})

// get All Faculty

const getAllfFacultys = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields)
  const paginationOption = pick(req.query, paginationFields)

  const result = await FacultyService.getAllfFacultys(filters, paginationOption)
  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Faculty Scuuessfully',
    meta: result.meta,
    data: result.data,
  })
})

//update Faculty

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updateData = req.body
  const result = await FacultyService.updateFaculty(id, updateData)
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully !',
    data: result,
  })
})

// delete Faculty

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await FacultyService.deleteFaculty(id)
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully !',
    data: result,
  })
})

export const FacultyController = {
  getSingleFaculty,
  getAllfFacultys,
  updateFaculty,
  deleteFaculty,
}
