import { ConfigService } from '@nestjs/config';
import { isDev } from 'src/libs/utils/helpers';
import { MailerOptions } from '@nestjs-modules/mailer';

export const getMailerConfig = async ($config: ConfigService): Promise<MailerOptions> => ({
  transport: {
    host: $config.getOrThrow('MAIL_HOST'),
    port: $config.getOrThrow('MAIL_PORT'),
    secure: !isDev($config),
    auth: {
      user: $config.getOrThrow('MAIL_LOGIN'),
      pass: $config.getOrThrow('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: $config.getOrThrow('MAIL_LOGIN'),
  },
});
