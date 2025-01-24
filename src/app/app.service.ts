import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { MICRO_SERVICE_OPTIONS } from 'src/helpers/consts';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: MICRO_SERVICE_OPTIONS,
    });
  }

  sendMessage() {
    this.client.emit('message', 'New order!');
  }
}
