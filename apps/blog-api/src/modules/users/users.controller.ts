import { Body, Controller, Get, HttpCode, Post, Req, UseGuards, UsePipes } from '@nestjs/common'
import { UserInfoDto, userInfoSchema } from './dto/user-info.dto'
import { ZodValidationPipe } from 'src/infra/validators/zod-validator.pipe'
import { UsersService } from './users.service'
import { RequestWithUser } from 'src/common/types'
import { Profile } from './types'
import { JwtAuthGuard } from '../sessions/guards/jwt.guard'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(userInfoSchema))
  async createUser(@Body() userInfo: UserInfoDto) {
    await this.usersService.createUser(userInfo)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(200)
  async getProfile(@Req() req: RequestWithUser): Promise<Profile> {
    const { user } = req;
    return this.usersService.getProfile(user);
  }
}
