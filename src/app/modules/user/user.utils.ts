import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

// find last student user from db

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}

//genarate student id

export const genarateStudentId = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  const currentID =
    (await findLastStudentId()) || (0).toString().padStart(5, '0')

  let incrementID = (parseInt(currentID) + 1).toString().padStart(5, '0')

  incrementID = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementID}`

  return incrementID
}

// find last faculty user from db
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastFaculty?.id ? lastFaculty.id.substring(4) : undefined
}

//genarated Faculty ID

export const generateFacultyId = async (): Promise<string> => {
  const currentID =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')

  let incrementID = (parseInt(currentID) + 1).toString().padStart(5, '0')

  incrementID = `F-${incrementID}`
  return incrementID
}

// Admin ID
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}

export const generateAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdminId()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `A-${incrementedId}`

  return incrementedId
}
