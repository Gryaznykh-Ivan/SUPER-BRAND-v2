import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ShopDBModule } from 'src/db/shop/shop.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.SECRET,
            })
        }),
        ShopDBModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }