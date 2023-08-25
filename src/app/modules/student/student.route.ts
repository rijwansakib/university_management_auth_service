import express from 'express'
import { studentController } from './student.controller'
import validateRequest from '../../middleWares/validateRequest'
import { StudentValidation } from './student.validation'

const router = express.Router()

router.get('/:id', studentController.getSingleStudent)
router.delete('/:id', studentController.deleteStudent)
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  studentController.updateStudent
)
router.get('/', studentController.getAllStudent)

export const StudentRoutes = router
