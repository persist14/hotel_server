/* eslint-disable prettier/prettier */
/*
 * @Description: 
 * @Author: 
 * @Date: 2023-05-26 15:45:52
 * @LastEditTime: 2023-05-26 15:48:43
 * @LastEditors: 
 * @Reference: 
 */
import { Prop } from "@typegoose/typegoose";
export class Article {
    @Prop()
    title: string
    @Prop()
    content: string
}