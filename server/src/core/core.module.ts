import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './products/products.module';

@Module({
    imports: [
        AuthModule,
        ProductModule
    ],
})
export class CoreModule { }