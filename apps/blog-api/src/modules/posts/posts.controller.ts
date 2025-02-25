import { Body, Controller, Get, Post, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, createPostSchema } from './dto/post.dto';
import { JwtAuthGuard } from '../sessions/guards/jwt.guard';
import { RequestWithUser } from 'src/common/types';
import { ZodValidationPipe } from 'src/infra/validators/zod-validator.pipe';
import { GetPostsQueryDto, GetPostsQuerySchema } from './dto/get-posts-query.dto';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/')
  @UsePipes(new ZodValidationPipe(createPostSchema))
  async createPost(@Req() req: RequestWithUser, @Body() postDto: CreatePostDto) {
    const { user } = req;
    await this.postsService.createPost({
      ...postDto,
      ownerId: user.sub
    })
  }

  @Get('/')
  @UsePipes(new ZodValidationPipe(GetPostsQuerySchema))
  async getPosts(@Query() query: GetPostsQueryDto) {
    const { page, limit } = query;
    console.log(page, limit)
    return await this.postsService.get(page, limit);
  }
}
