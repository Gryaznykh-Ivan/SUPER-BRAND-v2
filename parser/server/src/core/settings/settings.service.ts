import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ParserDBService } from '../../db/parser/parser.service';
import { UpdateSettingDto } from './dto/updateSetting.dto';

@Injectable()
export class SettingsService {
    constructor(
        private prisma: ParserDBService,
    ) { }

    async getSettingById(settingId: string) {
        const setting = await this.prisma.settings.findUnique({
            where: { id: settingId },
        })

        if (setting === null) {
            throw new HttpException("Настройки не найден", HttpStatus.BAD_REQUEST)
        }

        return {
            success: true,
            data: setting
        }
    }

    async updateSetting(settingId: string, data: UpdateSettingDto) {
        const updateSettingQuery = {
            proxy: data.proxy,
            rate: data.rate,
            upTo135: data.upTo135,
            upTo200: data.upTo200,
            upTo266: data.upTo266,
            upTo333: data.upTo333,
            upTo400: data.upTo400,
            upTo466: data.upTo466,
            upTo533: data.upTo533,
            upTo600: data.upTo600,
            upTo666: data.upTo666,
            over666: data.over666
        }

        try {
            await this.prisma.settings.update({
                where: {
                    id: settingId
                },
                data: updateSettingQuery
            })

            return {
                success: true
            }
        } catch (e) {
            console.log(e)
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
