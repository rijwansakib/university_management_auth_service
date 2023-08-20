import express from 'express'
import { UsersRoutes } from '../modules/user/user.route'
import { semesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/acdemicFaculty.routes'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/academic-semesters',
    route: semesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

// router.use('/users/', UsersRoutes)
// router.use('/academic-semesters', semesterRoutes)

export default router
