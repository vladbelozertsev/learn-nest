import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';
import { PrivateController } from './private.controller';
import { PrivateService } from './private.service';

@Module({
  imports: [JwtModule],
  controllers: [PrivateController],
  providers: [PrivateService, PrismaService],
})
export class PrivateModule {}
