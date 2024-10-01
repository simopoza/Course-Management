import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('user: ', user);

    console.log(request.headers);
    console.log('cookies: ', request.cookies);

    console.log('==================================\nim here\n=====================================')
    // Avoid returning the full `request` object
    if (!request.cookies['accessToken']) {
      throw new UnauthorizedException();
    }
    return true;
  }
}