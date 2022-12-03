import { Response } from 'express'
import { Body, Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { Cookies } from 'src/decorators/cookies.decorator';
import { AuthService } from './auth.service';
import { CustomerLoginDto } from './dto/customerLogin.dto';
import { SendCodeDto } from './dto/sendCode.dto';
import { UserLoginDto } from './dto/userLogin.dto';



@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post('login/user')
    @HttpCode(200)
    userLogin(
        @Body() loginDto: UserLoginDto,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.userLogin(response, loginDto)
    }
    

    @Post('login/customer')
    @HttpCode(200)
    customerLogin(
        @Body() loginDto: CustomerLoginDto,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.customerLogin(response, loginDto)
    }

    @Post('createGuest')
    @HttpCode(200)
    createGuest(
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.createGuest(response)
    }

    @Post('refresh/user')
    @HttpCode(200)
    userRefresh(
        @Cookies('refreshToken') refreshToken: string,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.userRefreshToken(response, refreshToken)
    }

    @Post('refresh/customer')
    @HttpCode(200)
    customerRefresh(
        @Cookies('refreshToken') refreshToken: string,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.customerRefreshToken(response, refreshToken)
    }

    @Post('logout/customer')
    @HttpCode(200)
    customerLogout(
        @Cookies('refreshToken') refreshToken: string,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.customerLogout(response, refreshToken)
    }

    @Post('logout/user')
    @HttpCode(200)
    userLogout(
        @Cookies('refreshToken') refreshToken: string,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.userLogout(response, refreshToken)
    }

    @Post('sendCode')
    @HttpCode(200)
    sendCode(
        @Body() sendCodeDto: SendCodeDto,
    ) {
        return this.authService.sendCode(sendCodeDto)
    }
}