
import { Module } from '@nestjs/common';
import { ShopDBService } from './shop.service';

@Module({
  providers: [ShopDBService],
  exports: [ShopDBService],
})
export class ShopDBModule {}