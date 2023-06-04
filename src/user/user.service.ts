/* eslint-disable prettier/prettier */
/*
 * @Description: 
 * @Author: 
 * @Date: 2023-06-02 11:40:43
 * @LastEditTime: 2023-06-02 17:26:10
 * @LastEditors: Please set LastEditors
 * @Reference: 
 */
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../libs/db/src/schema/user';
import { ReturnModelType } from '@typegoose/typegoose';
interface RgtOpts {
    username: string, password: string, email?: string, phone?: string
}
@Injectable()
export class UserService {
    constructor(@Inject(User.name) private readonly UserDB: ReturnModelType<typeof User>) { }
    async login(username: string, password: string) {
        const findName = await this.UserDB.findOne({
            username
        })
        // 用户名存在 继续查询否则返回用户不存在
        if (!findName) {
            return {
                msg: '用户不存在',
                data: null
            }
        }
        // 查询用户
        const res = await this.UserDB.findOne({
            username,
            password
        }, {
            __v: 0,
        })
        let result
        if (res) {
            result = {
                data: res,
                msg: true
            }
        } else {
            result = {
                data: null,
                msg: '用户名或密码错误'
            }
        }
        return result
    }
    async register(data: RgtOpts) {
        const rSuc = await this.UserDB.create({
            ...data
        })
        if (rSuc._id) {
            return {
                data: null,
                msg: true
            }
        } else {
            return {
                data: null,
                msg: false
            }
        }
    }
    async profile(id): Promise<any> {
        const rdata = await this.UserDB.findOne({ _id: id })
        return rdata
    }
}
