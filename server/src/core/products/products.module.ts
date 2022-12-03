import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UploadModule } from "src/upload/upload.module";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";

@Module({
    imports: [
        UploadModule,
        PrismaModule
    ],
    controllers: [ProductController],
    providers: [JwtService, ProductService]
})

export class ProductModule { }