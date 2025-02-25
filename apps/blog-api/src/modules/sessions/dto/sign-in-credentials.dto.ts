import { z } from 'zod'

export const signInCredentialsSchema = z.object({
  username: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
})

export type SignInCredentialsDto = z.infer<typeof signInCredentialsSchema>
