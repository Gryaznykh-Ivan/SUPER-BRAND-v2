import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ParserDBModule } from "src/db/parser/parser.module";
import { ShopDBModule } from "src/db/shop/shop.module";
import { PriceModule } from "src/utils/price/price.module";
import { PuppetterModule } from "src/utils/puppetter/puppetter.module";
import { ShopModule } from "../shop/shop.module";
import { ParserController } from "./parser.controller";
import { ParserService } from "./parser.service";

@Module({
    imports: [
        ParserDBModule,
        ShopDBModule,
        PuppetterModule,
        PriceModule,
        ShopModule
    ],
    controllers: [ParserController],
    providers: [JwtService, ParserService]
})

export class ParserModule { }