import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UrlModule } from "src/utils/urls/urls.module";
import { CollectionController } from "./collections.controller";
import { CollectionService } from "./collections.service";

@Module({
    imports: [PrismaModule, HttpModule, UrlModule],
    controllers: [CollectionController],
    providers: [JwtService, CollectionService]
})

export class CollectionModule { }