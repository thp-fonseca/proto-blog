import { Module } from '@nestjs/common'
import { SessionsService } from './sessions.service'
import { SessionsController } from './sessions.controller'
import { UsersModule } from '../users/users.module'
import { JwtAuthGuard } from './guards/jwt.guard'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [UsersModule],
  controllers: [SessionsController],
  providers: [SessionsService, JwtStrategy, JwtAuthGuard],
})
export class SessionsModule {}
