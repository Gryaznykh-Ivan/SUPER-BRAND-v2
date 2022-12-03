import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ACCESS, AuthGuard, ROLE } from 'src/guards/auth.guard';

export const Access = (access: keyof typeof ACCESS, roles?: (keyof typeof ROLE)[]) => applyDecorators(
    SetMetadata('access', access),
    SetMetadata('roles', roles || []),
    UseGuards(AuthGuard)
)
