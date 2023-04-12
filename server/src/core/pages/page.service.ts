import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePageDto } from './dto/createPage.dto';
import { UpdatePageDto } from './dto/updatePage.dto';
import { UrlService } from 'src/utils/urls/urls.service';

@Injectable()
export class PageService {
    constructor(
        private prisma: PrismaService,
        private url: UrlService
    ) { }

    async getPageById(pageId: string) {
        const page = await this.prisma.page.findUnique({
            where: { id: pageId },
            select: {
                id: true,
                title: true,
                content: true,
                handle: true,
                metaTitle: true,
                metaDescription: true,
            }
        })

        if (page === null) {
            throw new HttpException("Страница не найдена", HttpStatus.BAD_REQUEST)
        }

        const result = {
            id: page.id,
            title: page.title,
            content: page.content,
            handle: page.handle,
            metaTitle: page.metaTitle,
            metaDescription: page.metaDescription
        }

        return {
            success: true,
            data: result
        }
    }

    async getPagesBySearch(q: string, limit: number, skip: number) {
        const fulltextSearch = q ? q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 2).map(word => `+${word}*`).join(" ") : undefined
        const pages = await this.prisma.page.findMany({
            where: {
                title: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                }
            },
            select: {
                id: true,
                title: true,
                createdAt: true
            },
            skip: skip,
            take: limit > 20 ? 20 : limit,
            orderBy: [{
                createdAt: 'desc'
            }]
        })

        const result = pages.map(page => ({
            id: page.id,
            title: page.title,
            createdAt: page.createdAt
        }))

        return {
            success: true,
            data: result
        }
    }

    async createPage(data: CreatePageDto) {
        const createPageQuery = {
            title: data.title,
            content: data.content,
            handle: this.url.getSlug(data.handle) || this.url.getSlug(data.title),
            metaTitle: data.metaTitle || data.title,
            metaDescription: data.metaDescription
        }

        try {
            const page = await this.prisma.page.create({
                data: createPageQuery
            })

            return {
                success: true,
                data: page.id
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Страница с таким handle уже существует", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updatePage(pageId: string, data: UpdatePageDto) {
        const updatePageQuery = {
            title: data.title,
            content: data.content,
            handle: this.url.getSlug(data.handle),
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription
        }

        try {
            await this.prisma.page.update({
                where: {
                    id: pageId
                },
                data: updatePageQuery
            })

            return {
                success: true
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Страница с таким handle уже существует", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removePage(pageId: string) {
        try {
            await this.prisma.page.delete({
                where: { id: pageId }
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}