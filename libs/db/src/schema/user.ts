/*
 * @Description: 
 * @Author: 
 * @Date: 2023-05-26 15:08:22
 * @LastEditTime: 2023-05-26 15:09:45
 * @LastEditors: 
 * @Reference: 
 */
import { Prop } from "@typegoose/typegoose";

export class User {
    @Prop()
    username: string
    @Prop()
    password: string
}