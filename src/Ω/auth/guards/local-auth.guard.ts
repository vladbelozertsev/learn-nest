import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LoginInput } from '../schema/login.input';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  // LOGIN_STEP_#1
  getRequest(context: ExecutionContext) {
    console.log('step1');
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<Request>();
    request.body = ctx.getArgs<{ input: LoginInput }>().input;
    return request;
  }
}
