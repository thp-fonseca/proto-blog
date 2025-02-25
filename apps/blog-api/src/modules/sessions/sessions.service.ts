import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class SessionsService {
  constructor(
    @Inject() private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signinWithPassword(credentials: SignInCredentialsDto) {
    const user = await this.userService.getUserByUsername(credentials.username)
    if (
      !user ||
      !(await this.userService.validateUser(user, credentials.password))
    ) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const token = await this.jwtService.signAsync({
      sub: user.uuid,
      username: user.username,
    })
    return { token }
  }
}
