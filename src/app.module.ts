/* eslint-disable prettier/prettier */
/*
 * @Description:
 * @Author:
 * @Date: 2023-05-26 15:00:09
 * @LastEditTime: 2023-05-26 15:34:14
 * @LastEditors: Please set LastEditors
 * @Reference:
 */
import {Module, UseInterceptors} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '../libs/db/src/index'
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from "@nestjs/config";
import { HotelService } from './hotel/hotel.service';
import { HotelController } from './hotel/hotel.controller';
import { HotelModule } from './hotel/hotel.module';
@Module({
  imports: [
    DbModule,
    UserModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    HotelModule
  ],
  controllers: [AppController, HotelController],
  providers: [AppService, HotelService],
})
export class AppModule { }
