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
 *
 * Работа с бд:
 * 1. Установить бд (если не установлена) - Postgres
 * 2. Установить npm модули: npm install prisma --save-dev
 * 3. Установить CLI призмы локально: npx prisma
 * 4. Создать файлы призмы с настройками: npx prisma init
 * 5. Подключить бд в файле .env
 * 6. Создать модели в файле schema.prisma
 * 7. Запушить модели в бд: npx prisma db push
 *
 * https://github.com/nestjs/nest-cli/issues/2166
 *
 **/
