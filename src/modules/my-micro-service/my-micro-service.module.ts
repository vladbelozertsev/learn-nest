import { Module } from '@nestjs/common';
import { MyMicroServiceService } from './my-micro-service.service';
import { MyMicroServiceController } from './my-micro-service.controller';

@Module({
  controllers: [MyMicroServiceController],
  providers: [MyMicroServiceService],
})
export class MyMicroServiceModule {}
