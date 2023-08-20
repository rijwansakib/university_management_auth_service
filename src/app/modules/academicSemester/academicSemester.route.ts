import express from 'express'
import validateRequest from '../../middleWares/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemestercontroller } from './academicSemister.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemestercontroller.createSemester
)
router.get('/:id', AcademicSemestercontroller.getSingleSemester)
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemestercontroller.updateSemester
)

router.delete('/:id', AcademicSemestercontroller.deleteSemester)
router.get('/', AcademicSemestercontroller.getAllSemester)

export const semesterRoutes = router
