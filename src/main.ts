import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();

/**
 * Заметки:
 * 1. Middleware - применяется для одного или нескольких контроллеров
 * 2. Interceptor - применяется для контроллер
 * 3. Guard - применяется для метода в контроллере
 * 4. Pipe - применяется для аргумента в методе контроллера
 *
 * Порядок срабатывания
 * 1. Middleware
 * 2. Guard
 * 3. Interceptor BEFORE (тело функции)
 * 4. Pipe
 * 5. Interceptor AFTER (возвращаемое значение - return)
 **/
