import { Module } from '@nestjs/common';
import { ProductModule } from './products/products.module';
import { UserModule } from './users/user.module';

@Module({
    imports: [
        ProductModule,
        UserModule
    ],
})
export class CoreModule { }