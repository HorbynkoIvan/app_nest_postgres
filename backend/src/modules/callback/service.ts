import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class CallbackService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendCallback(
    phone: string,
    name: string,
    message: string,
  ): Promise<boolean> {
    await this.mailerService.sendMail({
      to: this.configService.get<string>('MAIL_MANAGEMENT'),
      subject: `${phone} ${name} [Зворотній дзвінок]`,
      template: 'callback',
      context: {
        phone,
        name,
        message,
      },
    });
    return true;
  }
}
