import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, { message: 'Please, enter a valid title' }),
  content: z.string().min(3, { message: 'Please, enter a valid content' }),
})

export type CreatePostDto = z.infer<typeof createPostSchema>

export const postIdParamPostSchema = z.object({
  postId: z.string().uuid({
    message: 'Should send a uuid postId',
  }),
})

export type PostIdDto = z.infer<typeof postIdParamPostSchema>

export const createCommentPostSchema = z.object({
  content: z.string().min(3, { message: 'Please, enter a valid content' }),
})

export type CreateCommentPostDto = z.infer<typeof createCommentPostSchema>

export const deleteCommentPostSchema = z.object({
  postId: z.string().uuid({
    message: 'Should send a uuid postId',
  }),
  commentId: z.string().uuid({
    message: 'Should send a uuid commentId',
  }),
})

export type DeleteCommentPostDto = z.infer<typeof deleteCommentPostSchema>
