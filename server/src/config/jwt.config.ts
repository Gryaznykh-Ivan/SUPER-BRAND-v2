import { JwtSignOptions } from '@nestjs/jwt';

export const JwtConfig = () => ({
  secret: process.env.SECRET,
})

export const AccessJwtConfig = (): JwtSignOptions => ({
  secret: process.env.SECRET,
  expiresIn: '15m',
});

export const RefreshTokenExpiresInConfig = () => new Date(Date.now() + 86400000 * 90)