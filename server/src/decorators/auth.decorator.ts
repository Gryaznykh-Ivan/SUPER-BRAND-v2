import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Right, Role } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';

export const Auth = (roles?: Role[], permissions?: Right[]) => applyDecorators(
    SetMetadata('roles', roles || []),
    SetMetadata('permissions', permissions || []),
    UseGuards(AuthGuard)
)
