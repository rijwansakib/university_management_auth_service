/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'

export type IUser = {
  admin: Types.ObjectId
  faculty: Types.ObjectId
  id: string
  role: string
  password: string
  student?: Types.ObjectId | IStudent
  needsPasswordChange: true | false
  passwordChangedAt?: Date
  // facult?:Types.ObjectId | IFaculty;
  // admin?:Types.ObjectId | IAdmin;
}

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
