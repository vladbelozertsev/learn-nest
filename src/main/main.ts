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
 * Структура проекта:
 * 1. auth - логика по аутентификации
 * 2. common - общая ?
 * 3. config - конфигурация для .env файла
 * 4. entity - работа с бд
 * 5. main - папка с конревыми файлами неста (добавлена мной для удобства)
 * 6. modules - модули nest (контролеры сервисы и тд)
 * 7 shared - ???
 *
 * Декораторы:
 * 1. Класса - может устанавиливать новые св-ва создаваемому объекту
 * 2. Метода - может устанавливать св-ва дескриптора: writable, enumerable, configurable.
 * 3. Свойства - может добавлять метаданные для св-ва (при помощи библ reflect-metadata)
 * 4. Параметра - применяется в методе класса или конструкторе, может добавлять метаданные для параметра (при помощи библ reflect-metadata)
 *
 * Полезные ссылки:
 * https://stackoverflow.com/questions/42201032/typescript-why-am-i-able-to-modify-readonly-property-in-constructor - про private
 * https://github.com/nestjs/nest-cli/issues/2166 - перенос main.ts файла в нужную папку (main в данном приложении)
 * https://www.typescriptlang.org/docs/handbook/decorators.html#metadata - декораторы
 * https://github.com/CatsMiaow/nestjs-project-structure - структура проекта NestJS
 **/
