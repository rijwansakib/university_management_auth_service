import express from 'express'

import validateRequest from '../../middleWares/validateRequest'
import { AcademicFacultyValidation } from './acdemicFaculty.validation'
import { AcademicFacultyController } from './acdemicFaculty.controller'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty
)
router.get('/get-faculty', AcademicFacultyController.getAllFaculties)
router.get('/:id', AcademicFacultyController.getSingleFaculty)

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  AcademicFacultyController.updateFaculty
)

router.delete('/:id', AcademicFacultyController.deleteFaculty)

export const AcademicFacultyRoutes = router
