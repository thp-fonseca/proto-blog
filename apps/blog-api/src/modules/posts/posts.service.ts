import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Post, PostDocument } from 'src/domain/schemas/post.schema'
import { UsersService } from '../users/users.service'
import { CreatePostDto } from './dto/post.dto'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @Inject() private readonly userService: UsersService
  ) {}

  async get(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const posts = await this.postModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate('owner', 'name avatarUrl')
      .exec();

    const transformedPosts = posts.map(post => ({
      id: post.uuid,
      content: post.content,
      title: post.title,
      author: {
        name: post.owner.name,
        avatar: post.owner.avatarUrl,
      },
      likes: 0, // Substitua pelo número real de curtidas, se disponível
      comments: 0, // Substitua pelo número real de comentários, se disponível
      createdAt: post.createdAt.toISOString(),
    }));  

    const total = await this.postModel.countDocuments().exec();

    return {
      data: transformedPosts,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async createPost({
    content,
    title,
    ownerId,
  }: CreatePostDto & { ownerId: string }) {
    const user = await this.userService.getUserByUUID(ownerId)
    if (!user) throw new UnauthorizedException('User is not Authorized')

    const newPost = new this.postModel({
      title,
      content,
      owner: user,
    })

    return newPost.save()
  }

  async incrementCommentCount(postId: string) {
    await this.postModel.updateOne(
      { _id: postId },
      { $inc: { comments: 1 } },
    );
  }  
}
