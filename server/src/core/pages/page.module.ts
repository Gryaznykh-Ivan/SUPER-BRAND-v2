import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UrlModule } from "src/utils/urls/urls.module";
import { PageController } from "./page.controller";
import { PageService } from "./page.service";

@Module({
    imports: [PrismaModule, UrlModule],
    controllers: [PageController],
    providers: [JwtService, PageService]
})

export class PageModule { }