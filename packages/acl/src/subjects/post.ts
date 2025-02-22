import { z } from 'zod'

import { postSchema } from '../models/post'

export const postSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Post'), postSchema]),
])

export type PostSubject = z.infer<typeof postSubject>
