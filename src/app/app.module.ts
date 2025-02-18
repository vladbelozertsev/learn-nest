import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from 'src/Ω/auth/auth.module';
import { CarsModule } from 'src/Ω/cars/cars.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FlowersModule } from 'src/Ω/flowers/flowers.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
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
    FlowersModule,
    UsersModule,
    CarsModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
