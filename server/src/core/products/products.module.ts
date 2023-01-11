import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";

@Module({
    imports: [PrismaModule, HttpModule],
    controllers: [ProductController],
    providers: [JwtService, ProductService]
})

export class ProductModule { }