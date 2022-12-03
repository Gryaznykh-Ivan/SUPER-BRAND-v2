import { Response } from 'express'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IResponse } from 'src/interfaces/Response';
import { NotifierService } from 'src/notifier/notifier.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerLoginDto } from './dto/customerLogin.dto';
import { SendCodeDto } from './dto/sendCode.dto';
import { HashConfig } from 'src/config/hash.config';
import { AccessJwtConfig, RefreshTokenExpiresInConfig } from 'src/config/jwt.config';
import { v4 as uuid } from 'uuid'
import { CustomerRole, Prisma } from '@prisma/client';
import { UserLoginDto } from './dto/userLogin.dto';
import { CookieConfig } from 'src/config/cookie.config';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly notifier: NotifierService,
        private readonly prisma: PrismaService
    ) { }

    async createGuest(response: Response): Promise<IResponse<string>> {
        const customer = await this.prisma.customer.create({ data: {} })

        const payload = {
            id: customer.id,
            role: customer.role
        }

        const accessToken = await this.jwtService.signAsync(payload, AccessJwtConfig())
        const refreshToken = uuid()

        await this.prisma.customerToken.create({
            data: {
                customerId: customer.id,
                refreshToken: refreshToken,
                expiresIn: RefreshTokenExpiresInConfig()
            }
        })

        response.cookie('refreshToken', refreshToken, CookieConfig)

        return {
            success: true,
            data: accessToken,
        }
    }

    async userLogin(response: Response, { login, password }: UserLoginDto): Promise<IResponse<string>> {
        const user = await this.prisma.user.findFirst({
            where: {
                email: login
            }
        })

        if (user === null) {
            throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)
        }

        const isPasswordCorrect = await compare(password, user.password);
        if (isPasswordCorrect === false) {
            throw new HttpException('Пароль указан неверно', HttpStatus.BAD_REQUEST)
        }

        const token = await this.getUserAccessToken(user.id, user.role, response)

        return {
            success: true,
            data: token,
        }
    }

    async customerLogin(response: Response, { login, code, guestId }: CustomerLoginDto): Promise<IResponse<string>> {
        const vc = await this.prisma.verificationCode.findFirst({
            where: {
                email: login
            },
            orderBy: [{ createdAt: 'desc' }]
        })

        if (vc === null) {
            throw new HttpException('Код не найден', HttpStatus.BAD_REQUEST)
        }

        if (Date.parse(vc.createdAt.toString()) < Date.now() - (5 * 60 * 1000)) {
            throw new HttpException('Попробуйте снова. Код актуален только 5 минут', HttpStatus.BAD_REQUEST)
        }

        const isCodeCorrect = await compare(code, vc.code);
        if (isCodeCorrect === false) {
            throw new HttpException('Код неверный', HttpStatus.BAD_REQUEST)
        }

        let customer = await this.prisma.customer.findFirst({ where: { email: login } })
        if (customer === null) {
            try {
                customer = await this.prisma.customer.create({
                    data: {
                        role: CustomerRole.CUSTOMER,
                        email: login
                    }
                })
            } catch (e) {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        throw new HttpException('Неверные данные токена', HttpStatus.BAD_REQUEST)
                    }
                }

                throw new HttpException("Ошибка на сервере", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

        if (guestId !== undefined) {
            // Сохраняем корзину
            await this.prisma.cartProduct.updateMany({
                where: { customerId: guestId },
                data: { customerId: customer.id }
            })

            // сохраняем избранное
            await this.prisma.favoriteProduct.updateMany({
                where: { customerId: guestId },
                data: { customerId: customer.id }
            })
        }


        const token = await this.getCustomerAccessToken(customer.id, customer.role, response)

        return {
            success: true,
            data: token,
        }
    }

    async customerRefreshToken(response: Response, refreshToken: string): Promise<IResponse<string>> {
        const token = await this.prisma.customerToken.findFirst({
            where: { refreshToken: refreshToken },
            include: {
                customer: true
            }
        })

        if (token === null) {
            throw new HttpException('Неверные данные токена', HttpStatus.UNAUTHORIZED)
        }

        if (Date.parse(token.expiresIn.toString()) < Date.now()) {
            throw new HttpException('Токен протух', HttpStatus.UNAUTHORIZED)
        }

        const payload = {
            id: token.customer.id,
            role: token.customer.role
        }

        const newAccessToken = await this.jwtService.signAsync(payload, AccessJwtConfig())
        const newRefreshToken = uuid()

        await this.prisma.customerToken.update({
            where: {
                id: token.id
            },
            data: {
                refreshToken: newRefreshToken,
                expiresIn: RefreshTokenExpiresInConfig()
            }
        })

        response.cookie('refreshToken', newRefreshToken, CookieConfig)

        return {
            success: true,
            data: newAccessToken,
        }
    }

    async userRefreshToken(response: Response, refreshToken: string): Promise<IResponse<string>> {
        const token = await this.prisma.userToken.findFirst({
            where: { refreshToken: refreshToken },
            include: {
                user: true
            }
        })

        if (token === null) {
            throw new HttpException('Неверные данные токена', HttpStatus.UNAUTHORIZED)
        }

        if (Date.parse(token.expiresIn.toString()) < Date.now()) {
            throw new HttpException('Токен протух', HttpStatus.UNAUTHORIZED)
        }

        const payload = {
            id: token.user.id,
            role: token.user.role
        }

        const newAccessToken = await this.jwtService.signAsync(payload, AccessJwtConfig())
        const newRefreshToken = uuid()

        await this.prisma.userToken.update({
            where: {
                id: token.id
            },
            data: {
                refreshToken: newRefreshToken,
                expiresIn: RefreshTokenExpiresInConfig()
            }
        })

        response.cookie('refreshToken', newRefreshToken, CookieConfig)

        return {
            success: true,
            data: newAccessToken,
        }
    }

    async sendCode({ login }: SendCodeDto): Promise<IResponse<void>> {
        const vc = await this.prisma.verificationCode.findFirst({
            where: {
                email: login
            },
            orderBy: [{ createdAt: 'desc' }]
        })

        if (Date.parse(vc.createdAt.toString()) > Date.now() - (2 * 60 * 1000)) {
            throw new HttpException('Отправить проверочный код можно раз в 2 минуты. Пожалуйста подождите', HttpStatus.BAD_REQUEST)
        }

        const code = await this.notifier.sendVerificationCode(login)
        const codeHash = await hash(code, HashConfig.saltRounds)

        await this.prisma.verificationCode.create({
            data: {
                email: login,
                code: codeHash
            }
        })

        return { success: true }
    }

    async customerLogout(response: Response, refreshToken: string): Promise<IResponse<void>> {
        await this.prisma.customerToken.deleteMany({
            where: {
                refreshToken: refreshToken
            }
        })

        response.cookie('refreshToken', "", { maxAge: -1 })

        return { success: true }
    }

    async userLogout(response: Response, refreshToken: string): Promise<IResponse<void>> {
        console.log(refreshToken)
        await this.prisma.userToken.deleteMany({
            where: {
                refreshToken: refreshToken
            }
        })

        response.cookie('refreshToken', "", { maxAge: -1 })

        return { success: true }
    }


    private async getCustomerAccessToken(id: string, role: string, response: Response) {
        const payload = {
            id: id,
            role: role
        }

        const accessToken = await this.jwtService.signAsync(payload, AccessJwtConfig())
        const refreshToken = uuid()

        await this.prisma.customerToken.create({
            data: {
                customerId: id,
                refreshToken: refreshToken,
                expiresIn: RefreshTokenExpiresInConfig()
            }
        })

        response.cookie('refreshToken', refreshToken, CookieConfig)

        return accessToken;
    }

    private async getUserAccessToken(id: string, role: string, response: Response) {
        const payload = {
            id: id,
            role: role
        }

        const accessToken = await this.jwtService.signAsync(payload, AccessJwtConfig())
        const refreshToken = uuid()

        await this.prisma.userToken.create({
            data: {
                userId: id,
                refreshToken: refreshToken,
                expiresIn: RefreshTokenExpiresInConfig()
            }
        })

        response.cookie('refreshToken', refreshToken, CookieConfig) // secure для SSL 

        return accessToken;
    }
}