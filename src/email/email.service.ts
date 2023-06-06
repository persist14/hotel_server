/* eslint-disable prettier/prettier */
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
const M = require('moment')

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}


    async sendEmailCode(data: {
        email: string,
        subject: string,
        sign: string
    }) {
        try {
            const code = Math.random().toString(6).slice(-6)
            const date = M().format('YYYY-MM-DD HH:mm:ss')
            const sendMailOpts: ISendMailOptions = {
                to: data.email,
                subject: data.subject || '用户邮箱验证',
                template: 'template.ejs',
                context: {
                    code,
                    date,
                    sign: data.sign || '系统邮件，回复无效'
                }
            }
            this.mailerService.sendMail(sendMailOpts).then(() => {
                console.log(`发送邮件给:${data.email},成功!主题:${data.subject || '默认'}`);
            }).catch(error => {
                console.log(`发送邮件给:${data.email}出错!主题:${data.subject || '默认'}`, error);
            });
            return { code: 200, message: '发送成功' };
        }catch(ex) {
            console.log('发送出错', ex);
        }
    } 
}
