import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class MyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('MY_GUARD');
    const req = context.switchToHttp().getRequest();
    const isAuth = req.headers.authorization === '220981';
    if (!isAuth) throw new UnauthorizedException();
    return isAuth;
  }
}
