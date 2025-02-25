import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { User } from './user.schema'
import { genUUID } from 'src/infra/crypto/crypto'

export type PostDocument = mongoose.HydratedDocument<Post>

@Schema({timestamps: true, collection: "posts" })
export class Post {
  @Prop({ type: String, default: function getUUID() {
    return genUUID()
  }})
  uuid: string

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  content: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  })
  owner: User

  @Prop({
    default: 0
  })
  likes: number

  @Prop({
    default: 0
  })
  comments: number

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date
}

export const PostSchema = SchemaFactory.createForClass(Post)

PostSchema.pre('deleteOne', async function(next) {
  const post = await this.model.findOne(this.getFilter());
  try {
    if (post) {
      await mongoose.model('comments').deleteMany({ post: post._id });
    }
  } finally {
    next();
  }
});
