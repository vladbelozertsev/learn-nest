import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CarsModule } from 'src/Ω/cars/cars.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/Ω/auth/auth.module';
import { UsersModule } from 'src/Ω/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: (...args) => ({ ctx: args }),
    }),
    AuthModule,
    UsersModule,
    CarsModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
