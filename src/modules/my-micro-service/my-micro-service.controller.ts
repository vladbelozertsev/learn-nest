import { Controller } from '@nestjs/common';
import { MyMicroServiceService } from './my-micro-service.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class MyMicroServiceController {
  constructor(private readonly myMicroServiceService: MyMicroServiceService) {}

  @EventPattern('message')
  hanleMessage(message: string) {
    this.myMicroServiceService.handleMessage(message);
  }
}
