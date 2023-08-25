import ApiError from '../../../Errors/api.errors'
import config from '../../../config/index'
import { IUser } from './user.interface'
import { User } from './user.model'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import {
  genarateStudentId,
  generateAdminId,
  generateFacultyId,
} from './user.utils'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'

/**
*create student*

**auto generated incremantal id
**default password
 */

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_student_password as string
  }

  // set roll [student | faculty | admin]

  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  //genarate student Id

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await genarateStudentId(academicSemester as IAcademicSemester)
    user.id = id
    student.id = id
    // array
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to create student')
    }
    // set student _iod into user.student
    user.student = newStudent[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to create user')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  return newUserAllData
}

// Create Faculty
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_faculty_password as string
  }

  // set role
  user.role = 'faculty'

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // generate faculty id
    const id = await generateFacultyId()
    // set custom id into both  faculty & user
    user.id = id
    faculty.id = id
    // Create faculty using sesssin
    const newFaculty = await Faculty.create([faculty], { session })

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ')
    }
    // set faculty _id (reference) into user.student
    user.faculty = newFaculty[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  return newUserAllData
}
//Create Admin

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_admin_password as string
  }
  // set role
  user.role = 'admin'

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // generate admin id
    const id = await generateAdminId()
    user.id = id
    admin.id = id

    const newAdmin = await Admin.create([admin], { session })

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ')
    }

    user.admin = newAdmin[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    })
  }

  return newUserAllData
}

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
}
