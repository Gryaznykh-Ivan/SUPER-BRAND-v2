import { Response } from 'express'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SendCodeDto } from './dto/sendCode.dto';
import { v4 as uuid } from 'uuid'
import { Role, Prisma } from '@prisma-shop';
import { LoginDto } from './dto/login.dto';
import { ShopDBService } from 'src/db/shop/shop.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: ShopDBService
    ) { }

    async refreshToken(response: Response, refreshToken: string) {
        const token = await this.prisma.token.findFirst({
            where: { refreshToken: refreshToken },
            select: {
                id: true,
                expiresIn: true,
                user: {
                    select: {
                        id: true,
                        role: true,
                        fullName: true,
                        permissions: {
                            select: {
                                right: true
                            }
                        }
                    }
                }
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
            role: token.user.role,
            name: token.user.fullName,
            permissions: token.user.permissions.map(({ right }) => right)
        }

        const newAccessToken = await this.jwtService.signAsync(payload, { secret: process.env.SECRET, expiresIn: process.env.EXPIRES_IN })
        const newRefreshToken = uuid()

        await this.prisma.token.update({
            where: {
                id: token.id
            },
            data: {
                refreshToken: newRefreshToken,
                expiresIn: this.refreshTokenExpiresIn()
            }
        })

        response.cookie('refresh_token', newRefreshToken, { httpOnly: true, maxAge: 15552000000, domain: process.env.COOKIE_DOMAIN, sameSite: "lax" })

        return {
            success: true,
            data: newAccessToken
        }
    }

    async logout(response: Response, refreshToken: string) {
        await this.prisma.token.deleteMany({
            where: {
                refreshToken: refreshToken
            }
        })

        response.cookie('refresh_token', "", { maxAge: -1, domain: process.env.COOKIE_DOMAIN, sameSite: "lax" })

        return { success: true }
    }

    private refreshTokenExpiresIn() {
        return new Date(Date.now() + 86400000 * 180)
    }
}