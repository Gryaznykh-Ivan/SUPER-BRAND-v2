import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UrlModule } from "src/utils/urls/urls.module";
import { OfferController } from "./offer.controller";
import { OfferService } from "./offer.service";

@Module({
    imports: [PrismaModule],
    controllers: [OfferController],
    providers: [JwtService, OfferService]
})

export class OfferModule { }