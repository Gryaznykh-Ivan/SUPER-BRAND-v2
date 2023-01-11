import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const permissions = this.reflector.get<string[]>('permissions', context.getHandler());

        try {
            const authHeader = request.headers.authorization
            const [_, token] = authHeader.split(' ')

            const decode = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET })

            request.user = decode
        } catch (e) {
            throw new UnauthorizedException();
        }

        if (roles.length !== 0 && roles.includes(request.user.role) === false) {
            throw new HttpException("Ваша роль не соответствует требованиям", HttpStatus.FORBIDDEN)
        }

        if (permissions.length !== 0 && permissions.some(permission => request.user.permissions.includes(permission)) === false) {
            throw new HttpException("У вас нет прав на действие", HttpStatus.FORBIDDEN)
        }

        return true;
    }
}