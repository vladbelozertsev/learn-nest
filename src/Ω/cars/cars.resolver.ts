import * as Gql from '@nestjs/graphql';
import { Car } from './schema/car.model';
import { CarsService } from './cars.service';
import { FileInput, FilesInput } from './schema/files.input';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { TakeInput } from 'src/libs/schema/take.input';
import { createWriteStream } from 'node:fs';
import { finished } from 'stream/promises';
import { saveFiles } from 'src/libs/utils/save-files';

// import { Car } from 'src/libs/prisma/car/car.model';
// import { CarCreateInput } from 'src/libs/prisma/car/car-create.input';
// import { FindManyCarArgs } from 'src/libs/prisma/car/find-many-car.args';

@Gql.Resolver()
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Gql.Mutation(() => Car)
  async addCarImg(@Gql.Args('input') input: FileInput) {
    if (!input.file) return;
    Buffer.from('Hello World').toString('base64');
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
  async addCarImgs(@Gql.Args('input') { files }: FilesInput) {
    console.log('123');
    const result = await saveFiles({ files, dir: 'public' });
    console.log(result);
    return { id: 123 };
  }

  @Gql.Query(() => [Car])
  // @UseGuards(JwtAuthGuard)
  getCars(@Gql.Args('input') input: TakeInput) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.carsService.findAll(input));
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
