import httpStatus from 'http-status'
import ApiError from '../../../Errors/api.errors'
import {
  academicSemesterSeacrchableFields,
  academicSemesterTitleCodeMaper,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IpaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
// create semester
const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMaper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }

  const result = await AcademicSemester.create(payload)
  return result
}

// get single semester
const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}

// get all  semester
const getAllSemester = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // Extract searchTerm to implement search query

  const { searchTerm, ...filtersData } = filters
  // Search needs $or for searching in specified fields
  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSeacrchableFields.map(fields => ({
        [fields]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  // const andConditions =[

  //  {
  //   $or:[
  //     {
  //       title:{
  //         $regex:searchTerm,
  //         $options:'i'
  //       },
  //     },
  //     {
  //       code:{
  //         $regex:searchTerm,
  //         $options:'i'
  //       },

  //     },
  //     {
  //       year:{
  //         $regex:searchTerm,
  //         $options:'i'
  //       },

  //     },
  //   ],
  //  },
  // ];

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)

    .skip(skip)

    .limit(limit)

  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// getUpdate Semester

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMaper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}

export const AcademicSemesterService = {
  createSemester,
  getSingleSemester,
  getAllSemester,
  updateSemester,
  deleteSemester,
}
