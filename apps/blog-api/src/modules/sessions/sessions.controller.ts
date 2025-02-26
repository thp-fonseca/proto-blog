import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SessionsService } from './sessions.service'
import { ZodValidationPipe } from 'src/infra/validators/zod-validator.pipe'
import {
  signInCredentialsSchema,
  SignInCredentialsDto,
} from './dto/sign-in-credentials.dto'

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @HttpCode(200)
  @Post('password')
  @UsePipes(new ZodValidationPipe(signInCredentialsSchema))
  @ApiOperation({ summary: 'Sign in with password' })
  @ApiBody({ type: SignInCredentialsDto })
  @ApiResponse({ status: 200, description: 'User signed in successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async signInWithPassword(@Body() credentials: SignInCredentialsDto) {
    return this.sessionsService.signinWithPassword(credentials)
  }
}
