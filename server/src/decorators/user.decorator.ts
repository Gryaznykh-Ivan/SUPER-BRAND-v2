import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        if (request.user !== undefined) {
            return request.user
        }
        
        try {
            const authHeader = request.haeders.authorization
            const [bearer, token] = authHeader.split(' ')

            if (bearer !== 'Bearer' || token === undefined) return undefined
        } catch (e) { }

        return request.user ? request.user : undefined
    },
);