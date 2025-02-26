import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

export const signInCredentialsSchema = z.object({
  username: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
})

export class SignInCredentialsDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  username: string

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string
}
