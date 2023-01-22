import { Module } from '@nestjs/common';
import { CollectionModule } from './collections/collections.module';
import { OfferModule } from './offers/offers.module';
import { ProductModule } from './products/products.module';
import { ShippingModule } from './shipping/shipping.module';
import { SuggestionModule } from './suggestions/suggestion.module';
import { UserModule } from './users/user.module';
import { VariantModule } from './variants/variants.module';

@Module({
    imports: [
        ProductModule,
        VariantModule,
        CollectionModule,
        UserModule,
        OfferModule,
        ShippingModule,
        SuggestionModule,
    ],
})
export class CoreModule { }