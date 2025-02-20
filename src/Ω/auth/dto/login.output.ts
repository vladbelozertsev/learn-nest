import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/Ω/users';

@ObjectType()
export class LoginOutput {
  @Field()
  user: User;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
