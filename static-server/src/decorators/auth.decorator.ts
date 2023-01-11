import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

export const Auth = (roles?: string[], permissions?: string[]) => applyDecorators(
    SetMetadata('roles', roles || []),
    SetMetadata('permissions', permissions || []),
    UseGuards(AuthGuard)
)
