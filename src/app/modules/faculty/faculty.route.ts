import express from 'express'
import { FacultyController } from './faculty.controller'
import validateRequest from '../../middleWares/validateRequest'
import { FacultyValidation } from './faculty.validation'

const router = express.Router()

router.get('/:id', FacultyController.getSingleFaculty)
router.get(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
)
router.get('/:id', FacultyController.deleteFaculty)
router.get('/', FacultyController.getAllfFacultys)

export const FacultyRoutes = router
