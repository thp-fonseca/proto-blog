import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { User } from './user.schema'

export type PostDocument = mongoose.HydratedDocument<Post>

@Schema({timestamps: true, collection: "posts" })
export class Post {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  content: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users' 
  })
  owner: User

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date
}

export const PostSchema = SchemaFactory.createForClass(Post)
