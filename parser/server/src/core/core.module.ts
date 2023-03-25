import { Module } from '@nestjs/common';
import { ParserModule } from './parser/parser.module';
import { ProductModule } from './products/products.module';
import { SettingsModule } from './settings/settings.module';

@Module({
    imports: [
        ProductModule,
        SettingsModule,
        ParserModule,
    ],
})
export class CoreModule { }