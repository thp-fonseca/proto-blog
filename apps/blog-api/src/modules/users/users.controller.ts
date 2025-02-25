import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { UserInfoDto, UserInfoSchema } from './dto/user-info.dto'
import { ZodValidationPipe } from 'src/infra/validators/zod-validator.pipe'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(UserInfoSchema))
  async createUser(@Body() userInfo: UserInfoDto) {
    await this.usersService.createUser(userInfo)
  }
}
