import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FlowersModule } from '../modules/flowers/flowers.module';
import { MICRO_SERVICE_OPTIONS } from 'src/helpers/consts';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MyMicroServiceModule } from 'src/modules/my-micro-service/my-micro-service.module';
import { MyMiddleware } from 'src/middlewares/my-middleware';
import { PushModule } from 'src/modules/push/push.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FlowersModule,
    PushModule,
    MyMicroServiceModule,
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: MICRO_SERVICE_OPTIONS,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [ConfigService, AppService],
})
export class AppModule implements NestModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyMiddleware).forRoutes('flowers');
  }
}
