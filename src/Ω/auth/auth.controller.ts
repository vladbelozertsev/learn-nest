import * as Nest from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Nest.Controller('auth')
export class AuthController {
  constructor() {}

  // @todo verify email logic
  @Nest.Get()
  @Nest.UseGuards(JwtAuthGuard)
  getVerifyEmailToken(@Nest.Query('verify') verify?: string) {
    console.log(verify);
    return 'Hello Express';
  }
}
