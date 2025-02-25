import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from 'src/Ω/auth/auth.module';
import { CarsModule } from 'src/Ω/cars/cars.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FlowersModule } from 'src/Ω/flowers/flowers.module';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from 'src/Ω/users/users.module';
import { join } from 'node:path';
import { PrivateModule } from 'src/Ω/private/private.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'public'),
      serveRoot: '/public/',
    }),
    AuthModule,
    CarsModule,
    FlowersModule,
    JwtModule,
    PrivateModule,
    UsersModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}

/**
 * Useful links:
 * https://www.apollographql.com/blog/file-upload-best-practices - csrf and other
 * https://stackoverflow.com/questions/63429380/how-to-serve-static-images-in-nestjs - static files
 * https://stackoverflow.com/questions/77173918/how-to-serve-static-files-on-nestjs - static files
 **/
