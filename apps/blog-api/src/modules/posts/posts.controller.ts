import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import {
  CreateCommentPostDto,
  createCommentPostSchema,
  CreatePostDto,
  createPostSchema,
  PostIdDto,
  postIdParamPostSchema,
} from './dto/post.dto'
import { JwtAuthGuard } from '../sessions/guards/jwt.guard'
import { RequestWithUser } from 'src/common/types'
import { ZodValidationPipe } from 'src/infra/validators/zod-validator.pipe'
import {
  GetPostsQueryDto,
  GetPostsQuerySchema,
} from './dto/get-posts-query.dto'

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/')
  @UsePipes(new ZodValidationPipe(createPostSchema))
  async createPost(
    @Req() req: RequestWithUser,
    @Body() postDto: CreatePostDto
  ) {
    const { user } = req
    await this.postsService.createPost({
      ...postDto,
      ownerId: user.sub,
    })
  }

  @Get('/')
  @UsePipes(new ZodValidationPipe(GetPostsQuerySchema))
  async getPosts(@Query() query: GetPostsQueryDto) {
    const { page, limit } = query
    console.log(page, limit)
    return await this.postsService.get(page, limit)
  }

  @Delete('/:postId')
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(postIdParamPostSchema))
  async deletePost(@Req() req: RequestWithUser, @Param() postDto: PostIdDto) {
    const { user } = req
    await this.postsService.delete({
      postId: postDto.postId,
      userId: user.sub,
    })
  }

  @HttpCode(200)
  @Get('/:postId/comments')
  @UsePipes(new ZodValidationPipe(postIdParamPostSchema))
  async getCommentsByPost(@Param() postDto: PostIdDto) {
    return this.postsService.getPostComments(postDto)
  }

  @HttpCode(200)
  @Post('/:postId/comments')
  async saveCommentToPost(
    @Req() req: RequestWithUser,
    @Param(new ZodValidationPipe(postIdParamPostSchema)) postDto: PostIdDto,
    @Body(new ZodValidationPipe(createCommentPostSchema)) createCommentDto: CreateCommentPostDto
  ) {
    const { user } = req
    return this.postsService.createComment({
      userId: user.sub,
      content: createCommentDto.content,
      postId: postDto.postId,
    })
  }
}
