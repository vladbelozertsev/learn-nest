import { ServeStaticModule } from '@nestjs/serve-static';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { AuthModule } from 'src/Ω/auth/auth.module';
import { CarsModule } from 'src/Ω/cars/cars.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { FlowersModule } from 'src/Ω/flowers/flowers.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
// import { UsersModule } from 'src/Ω/users/users.module';
import { join } from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
    }),
    // AuthModule,
    // FlowersModule,
    // UsersModule,
    CarsModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
