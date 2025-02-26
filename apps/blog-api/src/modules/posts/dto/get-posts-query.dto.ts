import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

export const GetPostsQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Page parameter must be positive integer.',
    }),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Limit parameter must be positive integer',
    }),
})

export class GetPostsQueryDto {
  @ApiProperty({ example: 1, description: 'The page number', required: false })
  page?: number

  @ApiProperty({
    example: 10,
    description: 'The number of items per page',
    required: false,
  })
  limit?: number
}
