import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Post, PostDocument } from 'src/domain/schemas/post.schema'
import { UsersService } from '../users/users.service'
import { CreatePostDto } from './dto/post.dto'
import { getUserPermissions } from 'src/common/acl/get-user-permissions'
import { Comment, CommentDocument } from 'src/domain/schemas/comment.schema'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
    @Inject() private readonly userService: UsersService
  ) {}

  async get(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const posts = await this.postModel
      .find()
      .sort({
        createdAt: -1
      })
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

  async delete({postId, userId}: { postId: string, userId: string }) {
    const user = await this.userService.getUserByUUID(userId)
    if(!user) 
      throw new UnauthorizedException("User not authorized")
    
    const {cannot} = getUserPermissions(user.uuid, user.role)

    if(cannot('delete', 'Post'))
      throw new UnauthorizedException("User not authorized to delete post")
      
    await this.postModel.deleteOne({
      uuid: postId
    })
  }

  async getPostComments({ postId }: {postId: string}) {
    const post = await this.postModel.findOne({
      uuid: postId
    }).populate('owner', 'avatarUrl name').exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comments = await this.commentModel
      .find({ post: post._id })
      .sort({
        createdAt: -1
      })
      .populate('owner', 'avatarUrl name').exec();

    return {
      post: {
        id: post.uuid,
        title: post.title,
        content: post.content,
        author: {
          avatar: post.owner.avatarUrl,
          name: post.owner.name,
        },
        createdAt: post.createdAt.toISOString(),
      },
      comments: comments?.map(comment => ({
        id: comment.uuid,
        author: {
          avatar: comment.owner.avatarUrl,
          name: comment.owner.name,
        },
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
      })) ?? [],
    };
  }

  async createComment({
    content,
    postId,
    userId
  }: {
    content: string
    userId: string
    postId: string
  }) {
    const user = await this.userService.getUserByUUID(userId)
    const post = await this.postModel.findOne({
      uuid: postId
    })
    if(!user || !post)
      throw new UnauthorizedException("User not authorized")

    const newComment = new this.commentModel({
      owner: user,
      post: post,
      content
    })
    return newComment.save().finally(() => {
      this.incrementCommentCount(post._id.toString())
    })
  }

  async incrementCommentCount(postId: string) {
    await this.postModel.updateOne(
      { _id: postId },
      { $inc: { comments: 1 } },
    );
  }
}
