import { z } from 'zod'

export const userInfoSchema = z.object({
  name: z.string().min(3, { message: 'Please, enter a valid name' }),
  username: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(5, { message: 'Please, provide your password.' }),
  role: z.enum(['ADMIN', 'MEMBER']).optional(),
})

export type UserInfoDto = z.infer<typeof userInfoSchema>
