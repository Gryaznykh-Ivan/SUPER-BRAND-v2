import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { VariantController } from "./variants.controller";
import { VariantService } from "./variants.service";

@Module({
    imports: [PrismaModule, HttpModule],
    controllers: [VariantController],
    providers: [JwtService, VariantService]
})

export class VariantModule { }