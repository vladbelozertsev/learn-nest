import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/main/prisma.service';
import { FlowersCreatedDto } from './flowers.dto';

@Injectable()
export class FlowersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.flower.findMany();
  }
  create(data: FlowersCreatedDto) {
    return this.prisma.flower.create({ data });
  }
}
