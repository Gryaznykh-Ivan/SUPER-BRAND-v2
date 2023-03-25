import { Module } from '@nestjs/common';
import { PriceService } from './price.service';

@Module({
    providers: [PriceService],
    exports: [PriceService]
})
export class PriceModule { }