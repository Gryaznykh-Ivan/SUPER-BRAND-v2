import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { FilesModule } from "src/utils/files/files.module";
import { UrlModule } from "src/utils/urls/urls.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
    imports: [PrismaModule, HttpModule, UrlModule, FilesModule],
    controllers: [ProductController],
    providers: [JwtService, ProductService]
})

export class ProductModule { }