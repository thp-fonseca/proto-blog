import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { User } from './user.schema'
import { Post } from './post.schema'

export type CommentDocument = mongoose.HydratedDocument<Comment>

@Schema({timestamps: true, collection: "comments" })
export class Comment {
  @Prop({ required: true })
  content: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users' 
  })
  owner: User

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts'
  })
  post: Post

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
