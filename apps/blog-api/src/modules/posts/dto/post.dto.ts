import { z } from 'zod'

export const createPostSchema = z.object({
    title: z.string().min(1, { message: 'Please, enter a valid title'}),
    content: z.string().min(3, { message: 'Please, enter a valid content' }),
})

export type CreatePostDto = z.infer<typeof createPostSchema>;
