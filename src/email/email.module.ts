/* eslint-disable prettier/prettier */
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import path from 'path';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { Global } from '@nestjs/common';
console.log(process.cwd(), '>>>>>>地址');

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'qq',
        port: 465,
        auth: {
          user: '321769601@qq.com',
          auth: 'knkdbdjccqqbbjif'
        }
      },
      preview: true,
      defaults: {
        from: '"发送人" <321769601@qq.com>',
      },
      template: {
        dir: process.cwd() + '/src/email',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService]
})
export class EmailModule {}