import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Role, RoleEnum } from '@workspace/acl'
import { Model } from 'mongoose'
import { TokenPayloadUser } from 'src/common/types'
import { User, UserDocument } from 'src/domain/schemas/user.schema'
import {
  generateSalt,
  generatePasswordHash,
  comparePassword,
} from 'src/infra/crypto/crypto'
import { Profile } from './types'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async createUser({
    name,
    username,
    password,
    avatarUrl,
    role = RoleEnum.MEMBER,
  }: {
    name: string
    username: string
    password: string
    avatarUrl?: string
    role?: Role
  }): Promise<User> {
    const salt = generateSalt()
    const passwordHash = generatePasswordHash(password, salt)

    const newUser = new this.userModel({
      name,
      username,
      avatarUrl,
      passwordHash,
      salt,
      role,
    })

    return newUser.save()
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec()
  }

  async getUserByUUID(id: string): Promise<User | null> {
    return this.userModel.findOne({ uuid: id }).exec()
  }

  async validateUser(user: User, password: string): Promise<boolean> {
    return comparePassword(password, user.passwordHash, user.salt)
  }

  async getProfile({username}: TokenPayloadUser): Promise<Profile> {
    const user = await this.getUserByUsername(username)
    if(!user) throw new NotFoundException("User not found")
    return {
      user: {
        name: user.name,
        role: user.role,
        email: user.username,
        id: user.uuid,
        avatarUrl: user?.avatarUrl
      }
    }
  }
}
