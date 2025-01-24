import { AppMode } from 'src/types/mode';
import { ConfigService } from '@nestjs/config';
import { FlowerAddDTO } from './dtos/flower-add.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';

@Injectable()
export class FlowersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  getAll() {
    console.log(this.config.get<AppMode>('MODE'));
    return this.prisma.flower.findMany();
  }
  create(data: FlowerAddDTO) {
    return this.prisma.flower.create({ data });
  }
}
