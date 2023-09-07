import { z } from 'zod'

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is requered',
    }),

    password: z.string({
      required_error: 'password is requered',
    }),
  }),
})
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refresh Token is requered',
    }),
  }),
})
const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old Password is requered',
    }),
    newPassword: z.string({
      required_error: 'New Password is requered',
    }),
  }),
})

export const AutrhValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
}
