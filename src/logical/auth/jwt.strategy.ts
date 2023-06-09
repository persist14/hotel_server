/* eslint-disable prettier/prettier */
// 验证策略
import { ExtractJwt,  Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { JWTKEY } from './constans'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWTKEY.secret
        })
    }
    async validate(payload: any) {
        return {
            id: payload.id,
            name: payload.name,
            username: payload.username
        }
    }
}
