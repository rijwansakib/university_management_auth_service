import { z } from 'zod'
//request validation
//body --> object
//data -->onject
const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
})
//    await createUserZodSchema.parseAsync(req)

export const userValidation = {
  createUserZodSchema,
}
