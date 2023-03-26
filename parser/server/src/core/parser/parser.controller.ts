import { Controller, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common"
import { Auth } from "src/decorators/auth.decorator"
import { Role } from '@prisma-shop';
import { ParserService } from "./parser.service"


@Controller('parser')
export class ParserController {

    constructor(
        private readonly parserService: ParserService
    ) { }

    @Get(':botId')
    getBotById(
        @Param("botId") botId: string
    ) {
        return this.parserService.getBotById(botId)
    }

    @Post('start')
    @Auth([Role.ADMIN])
    start() {
        return this.parserService.start()
    }

    @Post('complete')
    @Auth([Role.ADMIN])
    complete() {
        return this.parserService.complete()
    }
}