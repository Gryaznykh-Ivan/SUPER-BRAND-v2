import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ParserDBModule } from "src/db/parser/parser.module";
import { ShopDBModule } from "src/db/shop/shop.module";
import { PriceModule } from "src/utils/price/price.module";
import { BrowserModule } from "src/utils/browser/browser.module";
import { ShopModule } from "../shop/shop.module";
import { ParserController } from "./parser.controller";
import { ParserService } from "./parser.service";
import { RequestModule } from "src/utils/request/request.module";

@Module({
    imports: [
        ParserDBModule,
        ShopDBModule,
        BrowserModule,
        PriceModule,
        ShopModule,
        RequestModule
    ],
    controllers: [ParserController],
    providers: [JwtService, ParserService]
})

export class ParserModule { }