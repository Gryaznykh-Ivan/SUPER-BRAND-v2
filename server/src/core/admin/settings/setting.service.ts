
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferStatus, Prisma } from '@prisma/client';
import { PrismaService } from '@prisma-module/prisma.service';
import { UpdateSettingDto } from './dto/updateSetting.dto';

@Injectable()
export class SettingService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getSettingsBySearch(setting: string) {
        const settings = await this.prisma.setting.findMany({
            where: { setting },
            select: {
                id: true,
                setting: true,
                title: true,
                value: true,
                createdAt: true,
                updatedAt: true
            }
        })

        return {
            success: true,
            data: settings
        }
    }

    async updateSetting(data: UpdateSettingDto) {
        try {
            for (const setting of data.updateSettings) {
                await this.prisma.setting.update({
                    where: {
                        setting_title: {
                            setting: setting.setting,
                            title: setting.title,
                        }
                    },
                    data: {
                        value: setting.value
                    }
                })
            }

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}