import * as Gql from '@nestjs/graphql';
import { Car } from 'src/libs/prisma/car/car.model';
import { CarCreateInput } from 'src/libs/prisma/car/car-create.input';
import { CarsService } from './cars.service';
import { FindManyCarArgs } from 'src/libs/prisma/car/find-many-car.args';
import { FindUniqueCarArgs } from 'src/libs/prisma/car/find-unique-car.args';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateOneCarArgs } from 'src/libs/prisma/car/update-one-car.args';
import { UseGuards } from '@nestjs/common';
import { FileInput, FilesInput } from './schema/files.input';
import { uploadFileStream } from 'src/libs/utils/upload-file-stream';
import { join } from 'node:path';
import { createWriteStream } from 'node:fs';
import { finished } from 'stream/promises';
import { v4 } from 'uuid';
// import { Car } from 'src/libs/prisma/car/car.model';
// import { CarCreateInput } from 'src/libs/prisma/car/car-create.input';
// import { FindManyCarArgs } from 'src/libs/prisma/car/find-many-car.args';

@Gql.Resolver()
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  // @Gql.Mutation(() => Car)
  // createCar(@Gql.Args('input') input: CarCreateInput) {
  //   return this.carsService.create(input);
  // }

  @Gql.Mutation(() => Car)
  async addCarImg(@Gql.Args('input') input: FileInput) {
    const file = await input.file;
    const readStream = file.createReadStream();
    const writeStream = createWriteStream(`src/libs/assets/${file.filename}`);
    readStream.pipe(writeStream);

    try {
      await finished(writeStream);
    } catch (error: any) {
      console.log(error);
      return '';
    }

    return { id: 123 };
  }

  @Gql.Mutation(() => Car)
  async addCarImgs(@Gql.Args('input') input: FilesInput) {
    const files = await Promise.all(input.files.map((f) => f));

    files.forEach(async (file) => {
      const readStream = file.createReadStream();
      const writeStream = createWriteStream(`src/libs/assets/${file.filename}`);
      readStream.pipe(writeStream);
      try {
        await finished(writeStream);
      } catch (error: any) {
        console.log(error);
        return '';
      }
    });

    // .then((files) => {
    //   files.forEach(async (_aa, _dd, file) => {
    //     const readStream = file.createReadStream();
    //     const writeStream = createWriteStream(`src/libs/assets/${file.filename}`);
    //     readStream.pipe(writeStream);
    //     try {
    //       await finished(writeStream);
    //     } catch (error: any) {
    //       console.log(error);
    //       return '';
    //     }
    //   });
    //   // then.forEach((result) => console.log(result.status));
    // });

    return { id: 123 };
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
  car() {}

  // @Gql.Mutation(() => Car)
  // updateCar(@Gql.Args() args: UpdateOneCarArgs) {
  //   return this.carsService.update(args);
  // }

  // @Mutation(() => Car)
  // removeCar(@Args('id', { type: () => Int }) id: number) {
  //   return this.carsService.remove(id);
  // }
}
