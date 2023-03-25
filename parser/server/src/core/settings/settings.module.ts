import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ParserDBModule } from "src/db/parser/parser.module";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";

@Module({
    imports: [ParserDBModule],
    controllers: [SettingsController],
    providers: [JwtService, SettingsService]
})

export class SettingsModule { }