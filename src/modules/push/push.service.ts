import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { PushSendDTO } from './dtos/push-send.dto';

@Injectable()
export class PushService {
  constructor() {}

  async send({ token, body, title }: PushSendDTO) {
    return admin.messaging().send({
      android: { notification: { title, body } },
      token,
    });
  }
}
