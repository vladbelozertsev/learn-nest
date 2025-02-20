import * as admin from 'firebase-admin';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MyGuard } from 'src/libs/guards/my-guard';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get<ConfigService>(ConfigService);
  app.enableCors({ origin: 'http://10.0.2.2:3000', credentials: true });

  app.use(
    graphqlUploadExpress({
      maxFileSize: 10000000,
      maxFiles: 10,
      overrideSendResponse: false,
    }),
  );
  app.useGlobalGuards(new MyGuard());

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.get('FIREBASE_PROJECT_ID'),
      clientEmail: config.get('FIREBASE_CLIENT_EMAIL'),
      privateKey: config.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    }),
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
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
 * https://www.reddit.com/r/nestjs/comments/1fwl96f/what_folder_structure_do_you_use/?rdt=49398 - структура
 *
 * Структура проекта NestJS:
 * https://github.com/CatsMiaow/nestjs-project-structure -
 * https://www.reddit.com/r/typescript/comments/pvel5i/domaindriven_hexagon_ddd_architecture_best/
 * https://dev.to/bendix/applying-domain-driven-design-principles-to-a-nest-js-project-5f7b
 * https://www.geeksforgeeks.org/folder-structure-of-a-nestjs-project/
 * https://github.com/Sairyss/domain-driven-hexagon
 *
 * Призма генерация DTO
 * https://stackoverflow.com/questions/76978671/nestjs-and-prisma-do-we-really-need-dtos-for-validation-when-we-could-use-prism
 * https://www.prisma.io/docs/orm/prisma-schema/overview/generators
 * https://github.com/unlight/prisma-nestjs-graphql
 *
 * JWT настройка + прочее
 * https://www.youtube.com/watch?v=S8Cjx5ua2JU - passport + refresh
 * https://www.youtube.com/watch?v=XPSSgAPjTb4 - graphql
 * https://stackoverflow.com/questions/71785164/is-it-possible-to-have-multiple-local-strategies-in-passport-implemented-with-ne
 *
 * Прочее
 * https://stackoverflow.com/questions/64710499/integrate-firebase-notificaiton-in-nest-js - config
 * https://stackoverflow.com/questions/69907142/is-there-a-native-method-in-nestjs-to-decode-jwt
 **/
