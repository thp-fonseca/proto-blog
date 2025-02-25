import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { RoleEnum } from '@workspace/acl'
import { HydratedDocument } from 'mongoose'
import { genUUID } from 'src/infra/crypto/crypto'

export type UserDocument = HydratedDocument<User>

@Schema({timestamps: true, collection: "users" })
export class User {
  @Prop({ type: String, default: function getUUID() {
    return genUUID()
  }})
  uuid: string
  
  @Prop()
  name: string

  @Prop({ unique: true })
  username: string

  @Prop({ required: false })
  avatarUrl?: string

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
