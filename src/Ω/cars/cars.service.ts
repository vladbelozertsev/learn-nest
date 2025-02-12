import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma.service';
import { CarCreateInput } from 'src/libs/prisma/car/car-create.input';
// import { CarUpdateInput } from 'src/libs/prisma/car/car-update.input';
import { FindManyCarArgs } from 'src/libs/prisma/car/find-many-car.args';
import { FindUniqueCarArgs } from 'src/libs/prisma/car/find-unique-car.args';
import { UpdateOneCarArgs } from 'src/libs/prisma/car/update-one-car.args';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CarCreateInput) {
    return this.prisma.car.create({ data });
  }

  findAll(data: FindManyCarArgs) {
    return this.prisma.car.findMany(data);
  }

  findOne(where: FindUniqueCarArgs['where']) {
    return this.prisma.car.findFirst({ where });
  }

  update(input: UpdateOneCarArgs) {
    return `This action updates a #${input} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
