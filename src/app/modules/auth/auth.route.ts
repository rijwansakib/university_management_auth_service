import express from 'express'
import validateRequest from '../../middleWares/validateRequest'
import { AutrhValidation } from './auth.validation'
import { AuthController } from './auth.controller'
import auth from '../../middleWares/auth'
import { ENUM_USER_ROLE } from '../../../enmus/user'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AutrhValidation.loginZodSchema),
  AuthController.loginUser
)
router.post(
  '/refresh-token',
  validateRequest(AutrhValidation.refreshTokenZodSchema),
  AuthController.refreshtoken
)
router.post(
  '/change-password',
  validateRequest(AutrhValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AuthController.changePassword
)

export const AuthRoutes = router
