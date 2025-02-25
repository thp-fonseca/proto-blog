import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const cookieToken = request.cookies?.['token'] ?? null;
    if (!authHeader && cookieToken) {
      context.switchToHttp().getRequest().headers['authorization'] =
        `Bearer ${cookieToken}`;
    }
    const result = (await super.canActivate(context)) as boolean;
    return result;
  }
}
