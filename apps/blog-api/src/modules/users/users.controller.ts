import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UserInfoDto, userInfoSchema } from './dto/user-info.dto'
import { ZodValidationPipe } from 'src/infra/validators/zod-validator.pipe'
import { UsersService } from './users.service'
import { RequestWithUser } from 'src/common/types'
import { JwtAuthGuard } from '../sessions/guards/jwt.guard'
import { UserProfileDto } from './dto/user-profile.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(userInfoSchema))
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserInfoDto })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createUser(@Body() userInfo: UserInfoDto) {
    await this.usersService.createUser(userInfo)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
    type: UserProfileDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getProfile(@Req() req: RequestWithUser): Promise<UserProfileDto> {
    const { user } = req
    return this.usersService.getProfile(user)
  }
}
