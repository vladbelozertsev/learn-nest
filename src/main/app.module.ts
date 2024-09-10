import { FlowersModule } from '../modules/flowers/flowers.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MyMiddleware } from './my-middleware';

@Module({
  imports: [FlowersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MyMiddleware).forRoutes('flowers');
  }
}
