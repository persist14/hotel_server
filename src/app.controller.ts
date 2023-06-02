/* eslint-disable prettier/prettier */
/*
 * @Description: 
 * @Author: 
 * @Date: 2023-05-26 15:00:09
 * @LastEditTime: 2023-06-02 14:03:17
 * @LastEditors: Please set LastEditors
 * @Reference: 
 */

import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ReturnModelType } from '@typegoose/typegoose'
import { User } from '@app/db/schema/user';
import { Article } from '@app/db/schema/article';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(User.name) private readonly DB: ReturnModelType<typeof User>,
    @Inject(Article.name) private readonly ArtDB: ReturnModelType<typeof Article>
    ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @Get('user')
  // async getUserInfo() {
  //   const res = await this.DB.find()
  //   return {
  //     code: 200,
  //     data: res
  //   }
  // }
  // @Get('article')
  // async getArticleInfo() {
  //   const res = await this.ArtDB.find()
  //   return {
  //     code: 200,
  //     data: res
  //   }
  // }
}
