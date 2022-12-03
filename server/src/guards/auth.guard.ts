import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/jwt.config';


export const ACCESS = {
    PUBLIC: 'PUBLIC',
    PRIVATE: 'PRIVATE',
};

export const ROLE = {
    ADMIN: 'ADMIN',
    SELLER: 'SELLER',
    MANAGER: 'MANAGER',
};

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
        const access = this.reflector.get<boolean>('access', context.getHandler()) || ACCESS.PUBLIC;
        const roles = this.reflector.get<(keyof typeof ROLE)[]>('roles', context.getHandler()) || [];

        try {
            const authHeader = request.headers.authorization
            const [_, token] = authHeader.split(' ')

            const decode = await this.jwtService.verifyAsync(token, JwtConfig())
            request.user = decode
            
        } catch (e) {
            if (access !== ACCESS.PUBLIC) {
                throw new UnauthorizedException();
            }

            return true
        }

        if (roles.length !== 0) {
            return roles.includes(request.user.role);
        }

        return true;
    }
}