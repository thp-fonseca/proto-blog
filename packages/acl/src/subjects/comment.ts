import { z } from 'zod'

import { commentSchema } from '../models/comment'

export const commentSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Comment'), commentSchema]),
])

export type CommentSubject = z.infer<typeof commentSubject>