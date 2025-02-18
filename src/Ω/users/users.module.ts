import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/libs/services/mail/mail.module';
import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [forwardRef(() => AuthModule), JwtModule, MailModule],
  providers: [UsersResolver, UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
