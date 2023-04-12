import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Right, Role } from '@prisma/client';
import { Auth } from 'src/decorators/auth.decorator';
import { Token } from 'src/decorators/token.decorator';
import { CreatePageDto } from './dto/createPage.dto';
import { UpdatePageDto } from './dto/updatePage.dto';
import { PageService } from './page.service';
import { ParseBooleanPipe } from 'src/pipes/parse-boolean.pipe';

@Controller('pages')
export class PageController {

    constructor(
        private readonly pageService: PageService
    ) { }

    @Get('search')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PAGE_READ])
    getPagesBySearch(
        @Query('q') q: string,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    ) {
        return this.pageService.getPagesBySearch(q, limit, skip)
    }

    @Get(':pageId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PAGE_READ])
    getPageById(
        @Param('pageId') pageId: string
    ) {
        return this.pageService.getPageById(pageId)
    }


    @Post('create')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PAGE_UPDATE])
    createPage(
        @Body() data: CreatePageDto
    ) {
        return this.pageService.createPage(data)
    }

    @Put(':pageId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PAGE_UPDATE])
    updatePage(
        @Param('pageId') pageId: string,
        @Body() data: UpdatePageDto
    ) {
        return this.pageService.updatePage(pageId, data)
    }

    @Delete(':pageId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PAGE_UPDATE])
    removePage(
        @Param('pageId') pageId: string,
    ) {
        return this.pageService.removePage(pageId)
    }
}