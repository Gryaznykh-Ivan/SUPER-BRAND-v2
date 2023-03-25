import { Module } from "@nestjs/common";
import { ShopDBModule } from "src/db/shop/shop.module";
import { ShopService } from "./shop.service";

@Module({
    imports: [ShopDBModule],
    providers: [ShopService],
    exports: [ShopService]
})

export class ShopModule { }