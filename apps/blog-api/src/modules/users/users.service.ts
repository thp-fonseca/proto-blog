import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Role } from '@workspace/acl'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/domain/schemas/user.schema'
import { generateSalt, generatePasswordHash, comparePassword } from 'src/infra/crypto/crypto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async createUser(
    name: string,
    username: string,
    avatarUrl: string,
    password: string,
    role?: Role
  ): Promise<User> {
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

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      return false;
    }

    return comparePassword(password, user.passwordHash, user.salt);
  }
}
