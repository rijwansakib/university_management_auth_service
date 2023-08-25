import express from 'express'
import { UsersRoutes } from '../modules/user/user.route'
import { semesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/acdemicFaculty.routes'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes'
import { StudentRoutes } from '../modules/student/student.route'
import { FacultyRoutes } from '../modules/faculty/faculty.route'
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route'
import { AdminRoutes } from '../modules/admin/admin.route'

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
  {
    path: '/academic-departmant',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/facultys',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

// router.use('/users/', UsersRoutes)
// router.use('/academic-semesters', semesterRoutes)

export default router
