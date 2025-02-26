import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, { message: 'Please, enter a valid title' }),
  content: z.string().min(3, { message: 'Please, enter a valid content' }),
})

export class CreatePostDto {
  @ApiProperty({
    example: 'My First Post',
    description: 'The title of the post',
  })
  title: string

  @ApiProperty({
    example: 'This is the content of the post.',
    description: 'The content of the post',
  })
  content: string
}

export const postIdParamPostSchema = z.object({
  postId: z.string().uuid({ message: 'Should send a uuid postId' }),
})

export class PostIdDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The UUID of the post',
  })
  postId: string
}

export const createCommentPostSchema = z.object({
  content: z.string().min(3, { message: 'Please, enter a valid content' }),
})

export class CreateCommentPostDto {
  @ApiProperty({
    example: 'This is a comment.',
    description: 'The content of the comment',
  })
  content: string
}

export const deleteCommentPostSchema = z.object({
  postId: z.string().uuid({ message: 'Should send a uuid postId' }),
  commentId: z.string().uuid({ message: 'Should send a uuid commentId' }),
})

export class DeleteCommentPostDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The UUID of the post',
  })
  postId: string

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'The UUID of the comment',
  })
  commentId: string
}
