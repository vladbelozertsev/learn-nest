import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';
// import { CarUpdateInput } from 'src/libs/prisma/car/car-update.input';
// import { UpdateOneCarArgs } from 'src/libs/prisma/car/update-one-car.args';
import { TakeInput } from 'src/libs/schema/take.input';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  // create(data: CarCreateInput) {
  //   return this.prisma.car.create({ data });
  // }

  findAll(take: TakeInput) {
    return this.prisma.car.findMany(take);
  }

  // findOne(where: FindUniqueCarArgs['where']) {
  //   return this.prisma.car.findFirst({ where });
  // }

  // update(input: UpdateOneCarArgs) {
  //   return `This action updates a #${input} car`;
  // }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
