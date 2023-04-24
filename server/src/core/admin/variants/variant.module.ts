import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { FilesModule } from "src/utils/files/files.module";
import { VariantController } from "./variant.controller";
import { VariantService } from "./variant.service";

@Module({
    imports: [PrismaModule, FilesModule],
    controllers: [VariantController],
    providers: [JwtService, VariantService]
})

export class VariantModule { }