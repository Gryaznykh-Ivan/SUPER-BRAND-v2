import { Response } from 'express'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IResponse } from 'src/interfaces/Response';
import { NotifierService } from 'src/notifier/notifier.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendCodeDto } from './dto/sendCode.dto';
import { HashConfig } from 'src/config/hash.config';
import { AccessJwtConfig, RefreshTokenExpiresInConfig } from 'src/config/jwt.config';
import { v4 as uuid } from 'uuid'
import { Role, Prisma } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { CookieConfig } from 'src/config/cookie.config';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly notifier: NotifierService,
        private readonly prisma: PrismaService
    ) { }

    async createGuest(response: Response): Promise<IResponse<string>> {
        const user = await this.prisma.user.create({ data: {} })

        const payload = {
            id: user.id,
            role: user.role
        }

        const accessToken = await this.jwtService.signAsync(payload, AccessJwtConfig())
        const refreshToken = uuid()

        await this.prisma.token.create({
            data: {
                userId: user.id,
                refreshToken: refreshToken,
                expiresIn: RefreshTokenExpiresInConfig()
            }
        })

        response.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 15552000000, domain: CookieConfig.domain, sameSite: "lax" })

        return {
            success: true,
            data: accessToken,
        }
    }

    async login(response: Response, { login, code, guestId }: LoginDto): Promise<IResponse<string>> {
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

        let user = await this.prisma.user.findFirst({ where: { email: login } })
        if (user === null) {
            try {
                user = await this.prisma.user.create({
                    data: {
                        role: Role.CUSTOMER,
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
            await this.prisma.cartProduct.updateMany({
                where: { userId: guestId },
                data: { userId: user.id }
            })

            await this.prisma.favoriteProduct.updateMany({
                where: { userId: guestId },
                data: { userId: user.id }
            })
        }

        const payload = {
            id: user.id,
            role: user.role
        }

        const accessToken = await this.jwtService.signAsync(payload, AccessJwtConfig())
        const refreshToken = uuid()

        await this.prisma.token.create({
            data: {
                userId: user.id,
                refreshToken: refreshToken,
                expiresIn: RefreshTokenExpiresInConfig()
            }
        })

        response.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 15552000000, domain: CookieConfig.domain, sameSite: "lax" })

        return {
            success: true,
            data: accessToken
        }
    }

    async refreshToken(response: Response, refreshToken: string): Promise<IResponse<string>> {
        const token = await this.prisma.token.findFirst({
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
        
        await this.prisma.token.update({
            where: {
                id: token.id
            },
            data: {
                refreshToken: newRefreshToken,
                expiresIn: RefreshTokenExpiresInConfig()
            }
        })

        response.cookie('refresh_token', newRefreshToken, { httpOnly: true, maxAge: 15552000000, domain: CookieConfig.domain, sameSite: "lax" })
        
        return {
            success: true,
            data: newAccessToken
        }
    }

    async sendCode({ login }: SendCodeDto): Promise<IResponse<void>> {
        const vc = await this.prisma.verificationCode.findFirst({
            where: {
                email: login
            },
            orderBy: [{ createdAt: 'desc' }]
        })

        if (vc != null && Date.parse(vc.createdAt.toString()) > Date.now() - (2 * 60 * 1000)) {
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

    async logout(response: Response, refreshToken: string): Promise<IResponse<void>> {
        await this.prisma.token.deleteMany({
            where: {
                refreshToken: refreshToken
            }
        })

        response.cookie('refresh_token', "", { maxAge: -1, domain: CookieConfig.domain, sameSite: "lax" })

        return { success: true }
    }
}