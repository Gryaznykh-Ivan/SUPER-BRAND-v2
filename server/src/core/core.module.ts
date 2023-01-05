import { Module } from '@nestjs/common';
import { ProductModule } from './products/products.module';
import { SuggestionModule } from './suggestions/suggestion.module';
import { UserModule } from './users/user.module';

@Module({
    imports: [
        ProductModule,
        UserModule,
        SuggestionModule
    ],
})
export class CoreModule { }