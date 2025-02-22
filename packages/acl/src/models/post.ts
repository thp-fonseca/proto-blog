import { z } from 'zod'

export const postSchema = z.object({
  __typename: z.literal('Post').default('Post'),
  id: z.string(),
  ownerId: z.string(),
})

export type Post = z.infer<typeof postSchema>
