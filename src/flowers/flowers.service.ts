import { Injectable } from '@nestjs/common';

@Injectable()
export class FlowersService {
  getAll() {
    return [
      { name: 'rose', color: 'red', price: 50 },
      { name: 'tulip', color: 'white', price: 75 },
      { name: 'orchid', color: 'violet', price: 25 },
    ];
  }
}
