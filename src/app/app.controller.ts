import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sendMessage(): string {
    this.appService.sendMessage();
    console.log('Get root level request');
    return 'Message sent!';
  }
}
