import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-module/prisma.service';

@Injectable()
export class PageService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getPageByHandle(pageHandle: string) {
        const page = await this.prisma.page.findUnique({
            where: { handle: pageHandle },
            select: {
                id: true,
                title: true,
                content: true,
                handle: true,
                metaTitle: true,
                metaDescription: true,
                createdAt: true,
            }
        })

        if (page === null) {
            throw new HttpException("Страница не найдена", HttpStatus.NOT_FOUND)
        }

        return {
            success: true,
            data: page
        }
    }
}