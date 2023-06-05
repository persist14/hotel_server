/* eslint-disable prettier/prettier */
/*
 * @Description: 
 * @Author: 
 * @Date: 2023-06-02 11:40:03
 * @LastEditTime: 2023-06-02 11:41:44
 * @LastEditors: 
 * @Reference: 
 */
import { DynamicModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt'
import { JWTKEY } from 'src/logical/auth/constans';
import { EmailService } from 'src/email/email.service';

// jwt配置
const JwtRegister: DynamicModule = JwtModule.register({
  global: true,
  secret: JWTKEY.secret,
  signOptions: { expiresIn: '30d' }
})
@Module({
  imports: [
    JwtRegister,
  ],
  providers: [UserService, EmailService],
  controllers: [UserController],
})
export class UserModule { }
