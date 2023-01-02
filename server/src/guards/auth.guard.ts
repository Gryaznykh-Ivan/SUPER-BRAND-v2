import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Right, Role } from '@prisma/client';

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
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        const permissions = this.reflector.get<Right[]>('permissions', context.getHandler());

        try {
            const authHeader = request.headers.authorization
            const [_, token] = authHeader.split(' ')

            const decode = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET })

            request.user = decode
        } catch (e) {
            throw new UnauthorizedException();
        }

        if (roles.length !== 0) {
            return roles.includes(request.user.role);
        }
        if (roles.length !== 0) {
            return permissions.some(permission => request.user.permission.includes(permission));
        }

        return true;
    }
}