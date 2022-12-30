import { Response } from 'express'
import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Cookies } from 'src/decorators/cookies.decorator';
import { AuthService } from './auth.service';
import { SendCodeDto } from './dto/sendCode.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LogoutDto } from './dto/logout.dto';



@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post('login')
    @HttpCode(200)
    userLogin(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.login(response, loginDto)
    }

    @Post('createGuest')
    @HttpCode(200)
    createGuest(
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.createGuest(response)
    }

    @Post('refresh')
    @HttpCode(200)
    userRefresh(
        @Cookies() { refresh_token }: RefreshDto,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.refreshToken(response, refresh_token)
    }

    @Post('logout')
    @HttpCode(200)
    userLogout(
        @Cookies() { refresh_token }: LogoutDto,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.logout(response, refresh_token)
    }

    @Post('sendCode')
    @HttpCode(200)
    sendCode(
        @Body() sendCodeDto: SendCodeDto,
    ) {
        return this.authService.sendCode(sendCodeDto)
    }
}