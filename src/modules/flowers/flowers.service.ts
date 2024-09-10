import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/main/prisma.service';

@Injectable()
export class FlowersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.flower.findMany();
    // return [
    //   { name: 'rose', color: 'red', price: 50 },
    //   { name: 'tulip', color: 'white', price: 75 },
    //   { name: 'orchid', color: 'violet', price: 25 },
    // ];
  }
}
