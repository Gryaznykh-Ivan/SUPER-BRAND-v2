import { Response } from 'express';
import { Body, Controller, Delete, Get, Header, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeleteFileDto } from './dto/deleteFile.dto';
import { FilesService } from './files.service';

@Controller()
export class FilesController {
    constructor(
        private filesService: FilesService
    ) { }

    @Get('static/:url(*)')
    static(
        @Res({ passthrough: true }) res: Response,
        @Param('url') url: string
    ) {
        return this.filesService.static(res, url)
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    upload(
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        return this.filesService.upload(files)
    }

    @Delete('delete')
    delete(
        @Body() file: DeleteFileDto
    ) {
        return this.filesService.delete(file)
    }
}