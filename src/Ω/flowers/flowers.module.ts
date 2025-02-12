import { ConfigService } from '@nestjs/config';
import { FlowersController } from './flowers.controller';
import { FlowersService } from './flowers.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';

@Module({
  controllers: [FlowersController],
  providers: [FlowersService, PrismaService, ConfigService],
})
export class FlowersModule {}
