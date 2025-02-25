import { z } from 'zod'

const UserInfoSchema = z.object({
  name: z.string().min(3, { message: 'Please, enter a valid name'}),
  username: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(5, { message: 'Please, provide your password.' }),
})

class UserInfoDto {
  name: string
  username: string
  password: string
  avatarUrl?: string
}

export { UserInfoSchema, UserInfoDto }
