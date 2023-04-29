import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as process from 'process';
import * as path from 'path';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: `smtp://${process.env.MAILER_USER}:${process.env.MAILER_PASS}@${process.env.MAILER_SMTP}`,
      defaults: {
        from: '"nest-study" <sept-2022@nestjs.com>',
      },
      template: {
        dir: path.join(__dirname, '..', '..', '/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class CoreModule {}
