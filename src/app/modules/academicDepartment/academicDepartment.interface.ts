import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/acdemicFaculty.interface'

export type IAcademicDepartment = {
  title: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
}

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>

export type IAcademicDepartmentFilters = {
  searchTerm?: string
  academicFaculty?: Types.ObjectId
}
