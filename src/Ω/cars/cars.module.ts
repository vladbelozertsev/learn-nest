import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsResolver } from './cars.resolver';
import { PrismaService } from 'src/app/prisma.service';

@Module({
  providers: [CarsResolver, CarsService, PrismaService],
})
export class CarsModule {}
