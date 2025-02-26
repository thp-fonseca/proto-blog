import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod'

export const userInfoSchema = z.object({
  name: z.string().min(3, { message: 'Please, enter a valid name' }),
  username: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(5, { message: 'Please, provide your password.' }),
  role: z.enum(['ADMIN', 'MEMBER']).optional(),
})

export class UserInfoDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  password: string;

  @ApiProperty({ example: 'ADMIN', description: 'The role of the user', required: false })
  role?: 'ADMIN' | 'MEMBER';
}
