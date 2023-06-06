/* eslint-disable prettier/prettier */
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { Global } from '@nestjs/common';
import * as process from "process";
const emailOpts =  MailerModule.forRootAsync({
  useFactory: () => {
    const {EMAIL_COUNT, EMAIL_SECRET_KEY}  = process.env
    return {
      transport: {
        service: 'qq', // 发送的服务器地址
        port: 465, // 端口
        auth: { // 发送者验证
          user: EMAIL_COUNT,
          pass: EMAIL_SECRET_KEY
        }
      },
      // preview: true, 发送完毕打开页面预览
      defaults: {
        from: `"华商会" <${EMAIL_COUNT}>`, // 发送人格式
      },
      template: {
        dir: process.cwd() + '/src/email',
        adapter: new EjsAdapter(), // 使用ejs模板
        options: {
          strict: true,
        },
      },
    }
  }
})


@Global()
@Module({
  imports: [
    emailOpts
  ],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService]
})

export class EmailModule {

}
