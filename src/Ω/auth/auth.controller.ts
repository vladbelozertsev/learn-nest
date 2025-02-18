import * as Nest from '@nestjs/common';

@Nest.Controller('auth')
export class AuthController {
  constructor() {}
  @Nest.Get()
  getVerifyEmailToken(@Nest.Query('verify') verify?: string) {
    console.log(verify);
    return 'Hello Fastify';
  }
}
