import { Module } from '@nestjs/common';
import { CollectionModule } from './collections/collection.module';
import { OfferModule } from './offers/offer.module';
import { ProductModule } from './products/product.module';
import { ShippingModule } from './shipping/shipping.module';
import { SuggestionModule } from './suggestions/suggestion.module';
import { UserModule } from './users/user.module';
import { VariantModule } from './variants/variant.module';

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