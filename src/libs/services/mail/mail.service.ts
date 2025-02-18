import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPasswordTpl } from './templates/reset-password.template';
import { VerifyEmailTpl } from './templates/verify-email.template';
import { render } from '@react-email/components';

@Injectable()
export class MailService {
  constructor(private readonly $mailer: MailerService) {}
  async resetPassword(data: { password: string; email: string }) {
    const { password, email } = data;
    const subject = 'Сброс пароля';
    const html = await render(ResetPasswordTpl({ password }));
    return this.sendMail({ email, subject, html });
  }

  async verifyEmail(data: { link: string; email: string; token?: string }) {
    const { link, email, token } = data;
    const subject = 'Подтверждение почты';
    const html = await render(VerifyEmailTpl({ link, token }));
    return this.sendMail({ email, subject, html });
  }

  private sendMail(prams: { email: string; subject: string; html: string }) {
    return this.$mailer.sendMail({
      to: prams.email,
      subject: prams.subject,
      html: prams.html,
    });
  }
}
