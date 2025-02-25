import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { UsersModule } from '../users/users.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Post, PostSchema } from 'src/domain/schemas/post.schema'

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
