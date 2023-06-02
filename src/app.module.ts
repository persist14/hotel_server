/* eslint-disable prettier/prettier */
/*
 * @Description: 
 * @Author: 
 * @Date: 2023-05-26 15:00:09
 * @LastEditTime: 2023-05-26 15:34:14
 * @LastEditors: Please set LastEditors
 * @Reference: 
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '../libs/db/src/index'
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DbModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
