/* eslint-disable prettier/prettier */
// 验证逻辑
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@app/db/schema/user'
import { ReturnModelType } from '@typegoose/typegoose'
@Injectable()
export class AuthService {
    constructor(
        @Inject(User.name) private readonly userDB: ReturnModelType<typeof User>,
        private readonly jwtService: JwtService
        )
        {}
        async signIn(username: string, password: string): Promise<any> {
            const user = await this.userDB.findOne({ username })
            // 验证密码是否正确 正式项目需要验证加密的密码
            if( !user ||  user.password !== password) {
                throw new UnauthorizedException()
            }
            const payload = { username: user.username, email: user.email }
            const BearerToken = `Bearer ${await this.jwtService.signAsync(payload)}`
            return {
                access_token: BearerToken
            }
        }
}