import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IpaginationOptions } from '../../../interfaces/pagination'
import { academicDepartmentFilterableFields } from './academicDepartment.constants'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.mode'

//create department
const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  )
  return result
}

//getSingleDepartment
const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  )
  return result
}

//updateDepartment
const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFaculty')
  return result
}

// deleteDepartment

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id)
  return result
}

//getAllDepartments
const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  // Extract searchTerm to implement search query

  const { searchTerm, ...filtersData } = filters

  const andCondition = []

  // Search needs $or for searching in specified fields

  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: 'i',
        },
      })),
    })
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andCondition.push({
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

  // If there is no condition , put {} to give all data
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcademicDepartment.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicDepartmentService = {
  createDepartment,
  getSingleDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
}
