import { Injectable } from '@nestjs/common';

@Injectable()
export class MyMicroServiceService {
  handleMessage(message: string) {
    console.log('micro service message', message);
  }
}
