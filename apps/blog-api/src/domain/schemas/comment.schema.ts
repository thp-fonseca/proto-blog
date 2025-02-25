import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { User } from './user.schema'
import { Post } from './post.schema'
import { genUUID } from 'src/infra/crypto/crypto'

export type CommentDocument = mongoose.HydratedDocument<Comment>

@Schema({timestamps: true, collection: "comments" })
export class Comment {
  @Prop({ type: String, default: function getUUID() {
    return genUUID()
  }})
  uuid: string

  @Prop({ required: true })
  content: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  })
  owner: User

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  })
  post: Post

  @Prop({
    default: 0
  })
  likes: number

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
