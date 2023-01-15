import { Module } from '@nestjs/common';
import { CollectionModule } from './collections/collections.module';
import { ProductModule } from './products/products.module';
import { SuggestionModule } from './suggestions/suggestion.module';
import { UserModule } from './users/user.module';
import { VariantModule } from './variants/variants.module';

@Module({
    imports: [
        ProductModule,
        VariantModule,
        CollectionModule,
        UserModule,
        SuggestionModule
    ],
})
export class CoreModule { }