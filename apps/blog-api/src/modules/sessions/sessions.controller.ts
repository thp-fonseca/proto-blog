import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { SessionsService } from './sessions.service'
import { ZodValidationPipe } from 'src/infra/validators/zod-validator.pipe'
import {
  signInCredentialsSchema,
  SignInCredentialsDto,
} from './dto/sign-in-credentials.dto'

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @HttpCode(200)
  @Post('password')
  @UsePipes(new ZodValidationPipe(signInCredentialsSchema))
  async signInWithPassword(@Body() credentials: SignInCredentialsDto) {
    return this.sessionsService.signinWithPassword(credentials)
  }
}
