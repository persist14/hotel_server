/* eslint-disable prettier/prettier */
/*
 * @Description: 
 * @Author: 
 * @Date: 2023-06-02 11:42:15
 * @LastEditTime: 2023-06-02 17:39:38
 * @LastEditors: Please set LastEditors
 * @Reference: 
 */

import { Body, Controller, Post, Query, Get, UseGuards , Req, Inject} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt'
import { JWTKEY } from 'src/logical/auth/constans';
import { AuthGuard } from 'src/guard/auth.guard';
import { EmailService } from 'src/email/email.service';
@Controller()
export class UserController {
    constructor(
        private readonly UserService: UserService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
        ) { }
    @Post('login')
    async login(@Body() body) {
        const res = await this.UserService.login(body.username, body.password)
        let rsdata
        if (res.data) {
            const payload = { username: res.data.username, id: res.data._id }
            // 生成token
            const token = await this.jwtService.signAsync(payload, { expiresIn: '30d' })
            console.log(await this.jwtService.verifyAsync(token, { secret: JWTKEY.secret }));
            
            rsdata = {
                data: res.data,
                code: 200,
                msg: '登录成功',
                success: true,
                access_token: `Bearer ${token}`
            }
        } else {
            rsdata = {
                data: null,
                code: 200,
                msg: res.msg,
                success: false
            }
        }
        return rsdata
    }
    @Post('/register')
    async reg(@Body() body) {
        const res = await this.UserService.register(body)
        let reg = false
        if (res.msg) {
            reg = true
        }
        return {
            data: null,
            code: 200,
            success: reg,
            msg: '注册成功'
        }
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async profile(@Query() param: Record<string, any>, @Req() request: Request) {
        console.log(request['user']);
        
        const rdata = await this.UserService.profile(param.id)
        return {
            code: 200,
            msg: '',
            success: true,
            data: rdata
        }
    }
    // 忘记密码
    @Get('forget')
    async forget(@Query() params: Record<string, string>) {
        const result = await this.emailService.sendEmailCode({
            email: '321769601@qq.com',
            sign: '系统邮件',
            subject: '有效验证'
        })
        console.log(result, '>>>>>>>>');
        return result
    }

}
