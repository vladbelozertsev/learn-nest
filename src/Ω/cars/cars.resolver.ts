import * as Gql from '@nestjs/graphql';
import { Car } from 'src/libs/prisma/car/car.model';
import { CarCreateInput } from 'src/libs/prisma/car/car-create.input';
import { CarsService } from './cars.service';
import { FindManyCarArgs } from 'src/libs/prisma/car/find-many-car.args';
import { FindUniqueCarArgs } from 'src/libs/prisma/car/find-unique-car.args';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateOneCarArgs } from 'src/libs/prisma/car/update-one-car.args';
import { UseGuards } from '@nestjs/common';
import { FileInput } from './dto/upload.input';
import { uploadFileStream } from 'src/libs/utils/upload-file-stream';
// import { Car } from 'src/libs/prisma/car/car.model';
// import { CarCreateInput } from 'src/libs/prisma/car/car-create.input';
// import { FindManyCarArgs } from 'src/libs/prisma/car/find-many-car.args';

@Gql.Resolver()
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Gql.Mutation(() => Car)
  createCar(@Gql.Args('input') input: CarCreateInput) {
    return this.carsService.create(input);
  }

  @Gql.Mutation(() => Car)
  async addCarImg(@Gql.Args('input') input: FileInput) {
    const asd = await input.file;
    console.log(asd);
    const d = await uploadFileStream(asd);
    return { id: 123 };
    // return this.carsService.create(input);
  }

  @Gql.Query(() => [Car])
  // @UseGuards(JwtAuthGuard)
  cars(@Gql.Args() args: FindManyCarArgs) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.carsService.findAll(args));
      }, 5000);
    });
    // return this.carsService.findAll(input);
  }

  @Gql.Query(() => Car)
  car(@Gql.Args() args: FindUniqueCarArgs) {
    return this.carsService.findOne(args.where);
  }

  @Gql.Mutation(() => Car)
  updateCar(@Gql.Args() args: UpdateOneCarArgs) {
    return this.carsService.update(args);
  }

  // @Mutation(() => Car)
  // removeCar(@Args('id', { type: () => Int }) id: number) {
  //   return this.carsService.remove(id);
  // }
}
