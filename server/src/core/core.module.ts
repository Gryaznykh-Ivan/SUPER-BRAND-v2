import { Module } from '@nestjs/common';
import { ProductModule } from './products/products.module';

@Module({
    imports: [
        ProductModule
    ],
})
export class CoreModule { }