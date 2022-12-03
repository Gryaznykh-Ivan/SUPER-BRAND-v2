import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/jwt.config';
import { NotifierModule } from 'src/notifier/notifier.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: JwtConfig
        }),
        PrismaModule,
        NotifierModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }