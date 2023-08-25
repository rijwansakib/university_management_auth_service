import mongoose, { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IpaginationOptions } from '../../../interfaces/pagination'
import { facultySearchableFields } from './faculty.constant'
import { IFaculty, IFacultyFilters } from './faculty.interface'
import { Faculty } from './faculty.model'
import ApiError from '../../../Errors/api.errors'
import httpStatus from 'http-status'
import { User } from '../user/user.model'

// get single Faculty
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}

// get All Faculty

const getAllfFacultys = async (
  filters: IFacultyFilters,
  paginationOption: IpaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  // searchTerm

  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption)

  const andConditions = []

  // Search needs $or for searching in specified fields

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $option: 'i',
        },
      })),
    })
  }

  // Filters needs $and to fullfill all the conditions

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  // Dynamic  Sort needs  field to  do sorting

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Faculty.find(whereCondition)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Faculty.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

//update Faculty

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty Not Found')
  }

  const { name, ...facultyData } = payload
  const updateFacultyData: Partial<IFaculty> = { ...facultyData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>
      ;(updateFacultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Faculty.findOneAndUpdate({ id }, updateFacultyData, {
    new: true,
  })
  return result
}

// delete Faculty
const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  // check if the faculty is exist
  const isExist = await Faculty.findOne({ id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //delete faculty first
    const faculty = await Faculty.findOneAndDelete({ id }, { session })
    if (!faculty) {
      throw new ApiError(404, 'Failed to delete student')
    }
    //delete user
    await User.deleteOne({ id })
    session.commitTransaction()
    session.endSession()

    return faculty
  } catch (error) {
    session.abortTransaction()
    throw error
  }
}
export const FacultyService = {
  getSingleFaculty,
  getAllfFacultys,
  updateFaculty,
  deleteFaculty,
}
