/* eslint-disable prettier/prettier */
/*
 * @Description: 
 * @Author: 
 * @Date: 2023-06-02 11:42:15
 * @LastEditTime: 2023-06-02 17:39:38
 * @LastEditors: Please set LastEditors
 * @Reference: 
 */

import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import JWT from 'jsonwebtoken-esm'
@Controller()
export class UserController {
    constructor(private readonly UserService: UserService) { }
    @Post('login')
    async login(@Body() body) {
        const res = await this.UserService.login(body.username, body.password)
        let rsdata
        if (res.data) {
            // 生成token
            const token = JWT.sign(res.data.username, 'Pmer@163.com', {
                expiresIn: '7d'
            })
            rsdata = {
                data: res.data,
                code: 200,
                msg: '登录成功',
                token: 'berear ' + token,
                success: true
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
}
