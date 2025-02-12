import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/libs/prisma/user/user.model';

@ObjectType()
export class Auth {
  @Field()
  user: User;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
