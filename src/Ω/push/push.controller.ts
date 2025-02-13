import * as Nest from '@nestjs/common';
import { PushService } from './push.service';
import { PushSendDTO } from './dtos/push-send.dto';

@Nest.Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}
  @Nest.Get()
  Ok() {
    return 'OK';
  }

  @Nest.Post()
  async pushSend(@Nest.Body() dto: PushSendDTO) {
    const msg = await this.pushService.send(dto);
    return msg;
  }
}
