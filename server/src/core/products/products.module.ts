import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UrlModule } from "src/utils/urls/urls.module";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";

@Module({
    imports: [PrismaModule, HttpModule, UrlModule],
    controllers: [ProductController],
    providers: [JwtService, ProductService]
})

export class ProductModule { }