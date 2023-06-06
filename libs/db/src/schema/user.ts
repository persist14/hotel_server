/* eslint-disable prettier/prettier */
/*
 * @Description: 
 * @Author: 
 * @Date: 2023-05-26 15:08:22
 * @LastEditTime: 2023-06-02 11:44:59
 * @LastEditors: Please set LastEditors
 * @Reference: 
 */
import { Prop } from "@typegoose/typegoose";

export class User {
    @Prop({ required: true })
    username: string
    @Prop({ required: true })
    password: string
    @Prop()
    email: string
    @Prop()
    phone: string
    @Prop()
    avatar: string
}