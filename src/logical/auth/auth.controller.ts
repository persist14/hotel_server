/* eslint-disable prettier/prettier */
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    sigIn(@Body() sigInDto: Record<string, any>) {
        console.log(sigInDto, '>>>>>>>>>');
        
        return this.authService.signIn(sigInDto.username, sigInDto.password)
    }

}