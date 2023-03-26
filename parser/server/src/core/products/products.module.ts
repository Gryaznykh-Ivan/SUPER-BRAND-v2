import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ParserDBModule } from "src/db/parser/parser.module";
import { ShopModule } from "../shop/shop.module";

import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";

@Module({
    imports: [ParserDBModule, ShopModule],
    controllers: [ProductController],
    providers: [JwtService, ProductService]
})

export class ProductModule { }