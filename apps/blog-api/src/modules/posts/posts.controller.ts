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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { PostsService } from './posts.service'
import {
  CreateCommentPostDto,
  createCommentPostSchema,
  CreatePostDto,
  createPostSchema,
  DeleteCommentPostDto,
  deleteCommentPostSchema,
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

@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/')
  @UsePipes(new ZodValidationPipe(createPostSchema))
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, description: 'Post created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
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
  @ApiOperation({ summary: 'Get a list of posts' })
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid query parameters.' })
  async getPosts(@Query() query: GetPostsQueryDto) {
    const { page, limit } = query
    return await this.postsService.get(page, limit)
  }

  @Delete('/:postId')
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(postIdParamPostSchema))
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 204, description: 'Post deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid post ID.' })
  async deletePost(@Req() req: RequestWithUser, @Param() postDto: PostIdDto) {
    const { user } = req
    await this.postsService.delete({
      postId: postDto.postId,
      userId: user.sub,
    })
  }

  @Get('/:postId/comments')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(postIdParamPostSchema))
  @ApiOperation({ summary: 'Get comments for a post' })
  @ApiResponse({ status: 200, description: 'Comments retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid post ID.' })
  async getCommentsByPost(@Param() postDto: PostIdDto) {
    return this.postsService.getPostComments(postDto)
  }

  @Post('/:postId/comments')
  @HttpCode(200)
  @ApiOperation({ summary: 'Add a comment to a post' })
  @ApiBody({ type: CreateCommentPostDto })
  @ApiResponse({ status: 200, description: 'Comment added successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async saveCommentToPost(
    @Req() req: RequestWithUser,
    @Param(new ZodValidationPipe(postIdParamPostSchema)) postDto: PostIdDto,
    @Body(new ZodValidationPipe(createCommentPostSchema))
    createCommentDto: CreateCommentPostDto
  ) {
    const { user } = req
    return this.postsService.createComment({
      userId: user.sub,
      content: createCommentDto.content,
      postId: postDto.postId,
    })
  }

  @Delete('/:postId/comments/:commentId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a comment from a post' })
  @ApiResponse({ status: 204, description: 'Comment deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid post or comment ID.' })
  async deleteComment(
    @Req() req: RequestWithUser,
    @Param(new ZodValidationPipe(deleteCommentPostSchema))
    deleteCommentDto: DeleteCommentPostDto
  ) {
    const { user } = req
    return this.postsService.deleteComment({
      userId: user.sub,
      postId: deleteCommentDto.postId,
      commentId: deleteCommentDto.commentId,
    })
  }
}
