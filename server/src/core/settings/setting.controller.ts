import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Right, Role } from '@prisma/client';
import { Auth } from 'src/decorators/auth.decorator';
import { UpdateSettingDto } from './dto/updateSetting.dto';
import { SettingService } from './setting.service';

@Controller('settings')
export class SettingController {

    constructor(
        private readonly settingService: SettingService
    ) { }

    @Get('search')
    @Auth([Role.ADMIN])
    getSettingsBySearch(
        @Query('setting') setting: string
    ) {
        return this.settingService.getSettingsBySearch(setting)
    }

    @Put('update')
    @Auth([Role.ADMIN])
    updateSetting(
        @Body() data: UpdateSettingDto
    ) {
        return this.settingService.updateSetting(data)
    }
}