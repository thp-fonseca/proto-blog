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

export type GetPostsQueryDto = z.infer<typeof GetPostsQuerySchema>
