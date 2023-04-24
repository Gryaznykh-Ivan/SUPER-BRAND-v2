import { Controller, Get, Param } from '@nestjs/common';
import { PageService } from './page.service';


@Controller('api/pages')
export class PageController {
    constructor(
        private pageService: PageService
    ) { }

    @Get(':pageHandle')
    getPageByHandle(
        @Param('pageHandle') pageHandle: string
    ) {
        return this.pageService.getPageByHandle(pageHandle)
    }
}