/* eslint-disable prettier/prettier */
/*
 * @Description:
 * @Author:
 * @Date: 2023-05-26 15:00:09
 * @LastEditTime: 2023-05-26 15:34:14
 * @LastEditors: Please set LastEditors
 * @Reference:
 */
import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DbModule } from "../libs/db/src/index";
import { UserModule } from "./user/user.module";
import { EmailModule } from "./email/email.module";
import { ConfigModule } from "@nestjs/config";
import { HotelService } from "./hotel/hotel.service";
import { HotelController } from "./hotel/hotel.controller";
import { HotelModule } from "./hotel/hotel.module";
import { CommentService } from "./comment/comment.service";
import { CommentModule } from "./comment/comment.module";
import { UploadService } from "./upload/upload.service";
import { UploadController } from "./upload/upload.controller";
import { UploadModule } from "./upload/upload.module";

@Module({
  imports: [
    DbModule,
    UserModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    HotelModule,
    CommentModule,
    UploadModule,
    HttpModule
  ],
  controllers: [AppController, HotelController, UploadController],
  providers: [AppService, HotelService, CommentService, UploadService]
})
export class AppModule {
}
