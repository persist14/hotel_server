/* eslint-disable prettier/prettier */
/*
 * @Description:
 * @Author:
 * @Date: 2023-06-02 11:40:03
 * @LastEditTime: 2023-06-02 11:41:44
 * @LastEditors:
 * @Reference:
 */
import { DynamicModule, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { JwtModule } from "@nestjs/jwt";
import { JWTKEY } from "src/logical/auth/constans";
import { EmailService } from "src/email/email.service";
import { ConfigModule } from "@nestjs/config";

// jwt配置
const JwtRegister: DynamicModule = JwtModule.register({
  global: true,
  secret: JWTKEY.secret,
  signOptions: { expiresIn: "30d" }
});

@Module({
  imports: [
    JwtRegister,
    ConfigModule
  ],
  providers: [UserService, {
    // 重命名注入名称
    provide: "Email",
    useClass: EmailService
  }],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {
}
