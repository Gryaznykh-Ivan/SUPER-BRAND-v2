import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { Role } from '@prisma-shop';
import { UpdateSettingDto } from './dto/updateSetting.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {

    constructor(
        private readonly settingService: SettingsService
    ) { }

    @Get(':settingId')
    getSettingById(
        @Param('settingId') settingId: string
    ) {
        return this.settingService.getSettingById(settingId)
    }

    @Put(':settingId')
    @Auth([Role.ADMIN])
    updateSetting(
        @Param('settingId') settingId: string,
        @Body() data: UpdateSettingDto
    ) {
        return this.settingService.updateSetting(settingId, data)
    }
}