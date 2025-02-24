import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { RoleEnum } from '@workspace/acl'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({timestamps: true, collection: "users" })
export class User {
  @Prop()
  name: string

  @Prop({ unique: true })
  username: string

  @Prop()
  avatarUrl: string

  @Prop()
  passwordHash: string

  @Prop()
  salt: string

  @Prop({
    type: String, enum: RoleEnum, default: RoleEnum.MEMBER
  })
  role: RoleEnum

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: Date.now })
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
