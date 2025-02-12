import { ConfigService } from '@nestjs/config';
import { FlowerAddDTO } from './dto/flower-add.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';

@Injectable()
export class FlowersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  getAll() {
    console.log(this.config.getOrThrow('MODE'));
    return this.prisma.flower.findMany();
  }
  create(data: FlowerAddDTO) {
    return this.prisma.flower.create({ data });
  }
}
