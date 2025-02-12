// import { Car } from 'src/libs/prisma/car/car.model';
// import { CarCreateInput } from 'src/libs/prisma/car/car-create.input';
import { CarsService } from './cars.service';
// import { FindManyCarArgs } from 'src/libs/prisma/car/find-many-car.args';
import { FindUniqueCarArgs } from 'src/libs/prisma/car/find-unique-car.args';
import { Args, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { Car } from 'src/libs/prisma/car/car.model';
import { CarCreateInput } from 'src/libs/prisma/car/car-create.input';
import { FindManyCarArgs } from 'src/libs/prisma/car/find-many-car.args';
import { UpdateOneCarArgs } from 'src/libs/prisma/car/update-one-car.args';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver()
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Mutation(() => Car)
  createCar(@Args('input') input: CarCreateInput) {
    return this.carsService.create(input);
  }

  @Query(() => [Car])
  @UseGuards(JwtAuthGuard)
  cars(@Args() args: FindManyCarArgs, @Context() ctx) {
    console.log(ctx.req.headers);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.carsService.findAll(args));
      }, 5000);
    });
    // return this.carsService.findAll(input);
  }

  @Query(() => Car)
  car(@Args() args: FindUniqueCarArgs) {
    return this.carsService.findOne(args.where);
  }

  @Mutation(() => Car)
  updateCar(@Args() args: UpdateOneCarArgs) {
    return this.carsService.update(args);
  }

  // @Mutation(() => Car)
  // removeCar(@Args('id', { type: () => Int }) id: number) {
  //   return this.carsService.remove(id);
  // }
}
