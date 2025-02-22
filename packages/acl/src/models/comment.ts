import { z } from 'zod'

export const commentSchema = z.object({
  __typename: z.literal('Comment').default('Comment'),
  id: z.string(),
  ownerId: z.string(),
  post: z.object({
    __typename: z.literal('Post').default('Post'),
    id: z.string(),
    ownerId: z.string(),
  }),
})

export type Comment = z.infer<typeof commentSchema>
