import { FlowersModule } from '../modules/flowers/flowers.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MyMiddleware } from 'src/middlewares/my-middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), FlowersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyMiddleware).forRoutes('flowers');
  }
}
