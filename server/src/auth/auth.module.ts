import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { NotifierModule } from 'src/utils/notifier/notifier.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.SECRET,
            })
        }),
        PrismaModule,
        NotifierModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }