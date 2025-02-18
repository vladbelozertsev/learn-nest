import { CarsResolver } from './cars.resolver';
import { CarsService } from './cars.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';

@Module({
  providers: [CarsResolver, CarsService, PrismaService],
})
export class CarsModule {}
