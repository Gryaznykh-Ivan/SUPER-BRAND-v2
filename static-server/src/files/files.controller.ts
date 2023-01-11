import { Response } from 'express';
import { Body, Controller, DefaultValuePipe, Delete, Get, Header, Param, ParseIntPipe, Post, Query, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeleteFileDto } from './dto/deleteFile.dto';
import { FilesService } from './files.service';
import { Auth } from 'src/decorators/auth.decorator';

@Controller()
export class FilesController {
    constructor(
        private filesService: FilesService
    ) { }

    @Get('static/:folders(*/*/*)/:name')
    static(
        @Res({ passthrough: true }) res: Response,
        @Param('folders') folders: string,
        @Param('name') name: string,
        @Query('w') width: string
    ) {
        return this.filesService.static(res, folders, name, width)
    }

    @Auth(["ADMIN", "MANAGER"], ["MEDIA_UPLOAD"])
    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    upload(
        @UploadedFiles() files: Express.Multer.File[],
        @Query('q', new DefaultValuePipe(80), ParseIntPipe) q: number
    ) {
        return this.filesService.upload(files, q)
    }

    @Auth(["ADMIN", "MANAGER"], ["MEDIA_DELETE"])
    @Delete('delete')
    delete(
        @Body() data: DeleteFileDto
    ) {
        return this.filesService.delete(data)
    }
}