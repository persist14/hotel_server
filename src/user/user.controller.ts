/* eslint-disable prettier/prettier */
/*
 * @Description: 
 * @Author: 
 * @Date: 2023-06-02 11:42:15
 * @LastEditTime: 2023-06-02 17:39:38
 * @LastEditors: Please set LastEditors
 * @Reference: 
 */

import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "src/guard/auth.guard";

interface EmailOpts {
  email: string,
  subject: string,
  sign: string
}

@Controller()
export class UserController {
  constructor(
    private readonly UserService: UserService,
    private readonly jwtService: JwtService
    // private readonly emailService: EmailService,

  ) {
  }

  @Post("login")
  async login(@Body() body) {
    const res = await this.UserService.login(body.username, body.password);
    let rsdata;
    if (res.data) {
      const payload = { username: res.data.username, id: res.data._id };
      // 生成token
      const token = await this.jwtService.signAsync(payload, { expiresIn: "30d" });
      rsdata = {
        data: res.data,
        code: 200,
        msg: "登录成功",
        success: true,
        access_token: `Bearer ${token}`
      };
    } else {
      rsdata = {
        data: null,
        code: 200,
        msg: res.msg,
        success: false
      };
    }
    return rsdata;
  }

  @Post("/register")
  async reg(@Body() body) {
    const res = await this.UserService.register(body);
    let reg = false;
    if (res.msg) {
      reg = true;
    }
    return {
      data: null,
      code: 200,
      success: reg,
      msg: "注册成功"
    };
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  async profile(@Query() param: Record<string, any>, @Req() request: Request) {
    const rdata = await this.UserService.profile(param.id);
    return {
      code: 200,
      msg: "",
      success: true,
      data: rdata
    };
  }

  // 忘记密码
  @Post("forget")
  async forget(@Body() body: any) {
    const data: EmailOpts = {
      ...body,
      subject: "华商会",
      sign: "华商会邮件通知"
    };
    const result = await this.UserService.forget(data);

    return { ...result, data: "" };
  }

}
