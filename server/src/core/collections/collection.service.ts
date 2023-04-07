import * as FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCollectionDto } from './dto/createCollection.dto';
import { UpdateImageDto } from './dto/updateImage.dto';
import { UpdateCollectionDto } from './dto/updateCollection.dto';
import { firstValueFrom } from 'rxjs';
import { UrlService } from 'src/utils/urls/urls.service';
import { FilesService } from 'src/utils/files/files.service';

@Injectable()
export class CollectionService {
    constructor(
        private prisma: PrismaService,
        private url: UrlService,
        private files: FilesService
    ) { }

    async getCollectionById(collectionId: string) {
        const collection = await this.prisma.collection.findUnique({
            where: { id: collectionId },
            select: {
                id: true,
                title: true,
                description: true,
                handle: true,
                metaTitle: true,
                metaDescription: true,
                hidden: true,
                images: {
                    select: {
                        id: true,
                        src: true,
                        alt: true,
                        position: true,
                    },
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        })

        if (collection === null) {
            throw new HttpException("Коллекция не найдена", HttpStatus.BAD_REQUEST)
        }

        const result = {
            id: collection.id,
            title: collection.title,
            description: collection.description,
            hidden: collection.hidden,
            handle: collection.handle,
            metaTitle: collection.metaTitle,
            metaDescription: collection.metaDescription,
            images: collection.images,
        }

        return {
            success: true,
            data: result
        }
    }

    async getCollectionProducts(collectionId: string, q: string, limit: number, skip: number) {
        const fulltextSearch = q ? q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 2).map(word => `+${word}*`).join(" ") : undefined
        const products = await this.prisma.product.findMany({
            where: {
                title: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                },
                collections: {
                    some: {
                        id: collectionId
                    },
                }
            },
            select: {
                id: true,
                title: true,
                available: true,
                images: {
                    select: {
                        id: true,
                        alt: true,
                        src: true,
                        position: true
                    },
                    orderBy: {
                        position: 'asc'
                    },
                    take: 1
                }
            },
            skip: skip,
            take: limit > 20 ? 20 : limit,
            orderBy: [{ createdAt: 'desc' }]
        })

        const result = products.map(product => ({
            id: product.id,
            image: product.images[0] ?? null,
            title: product.title,
            available: product.available,
        }))

        return {
            success: true,
            data: result
        }
    }

    async getCollectionsBySearch(q: string, limit: number, skip: number) {
        const fulltextSearch = q ? q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 2).map(word => `+${word}*`).join(" ") : undefined
        const collections = await this.prisma.collection.findMany({
            where: {
                title: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                }
            },
            select: {
                id: true,
                title: true,
                _count: {
                    select: {
                        products: true
                    }
                },
                createdAt: true
            },
            skip: skip,
            take: limit > 20 ? 20 : limit,
            orderBy: [{
                createdAt: 'desc'
            }]
        })

        const result = collections.map(collection => ({
            id: collection.id,
            title: collection.title,
            productsCount: collection._count.products,
            createdAt: collection.createdAt
        }))

        return {
            success: true,
            data: result
        }
    }

    async createCollection(data: CreateCollectionDto) {
        const createCollectionQuery = {
            title: data.title,
            description: data.description,
            handle: this.url.getSlug(data.handle) || this.url.getSlug(data.title),
            metaTitle: data.metaTitle || data.title,
            metaDescription: data.metaDescription,
            hidden: data.hidden
        }

        if (data.connectProducts !== undefined) {
            Object.assign(createCollectionQuery, {
                products: {
                    connect: data.connectProducts
                }
            })
        }

        try {
            const collection = await this.prisma.collection.create({
                data: createCollectionQuery
            })

            return {
                success: true,
                data: collection.id
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Коллекция с таким handle уже существует", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async uploadImages(collectionId: string, images: Express.Multer.File[], token: string) {
        const collection = await this.prisma.collection.findFirst({
            where: { id: collectionId },
            select: {
                title: true
            }
        })

        if (collection === null) {
            throw new HttpException("Коллекция не найдена", HttpStatus.BAD_REQUEST)
        }

        try {
            const result = await this.files.upload(images, 100);
            if (result.success !== true) {
                throw new HttpException("Загрузить картинки не удалось", HttpStatus.INTERNAL_SERVER_ERROR)
            }

            const lastImage = await this.prisma.image.findFirst({
                where: { collectionId: collectionId },
                select: { position: true },
                orderBy: [{ position: 'desc' }]
            })

            const startPosition = lastImage !== null ? lastImage.position + 1 : 0
            const createImagesQuery = result.data.map((image, index) => ({
                path: image.path,
                src: image.src,
                blurhash: image.blurhash,
                alt: collection.title,
                position: startPosition + index,
                collectionId: collectionId
            }))

            await this.prisma.image.createMany({
                data: createImagesQuery
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async updateImage(collectionId: string, imageId: string, data: UpdateImageDto) {
        try {
            await this.prisma.$transaction(async tx => {
                if (data.src !== undefined || data.alt !== undefined) {
                    await tx.image.update({
                        where: { id: imageId },
                        data: {
                            src: data.src,
                            alt: data.alt
                        }
                    })
                }

                if (data.position !== undefined) {
                    const current = await tx.image.findFirst({
                        where: {
                            id: imageId
                        },
                        select: {
                            id: true,
                            position: true
                        }
                    })

                    await tx.image.updateMany({
                        where: {
                            collectionId,
                            position: data.position
                        },
                        data: {
                            position: current.position
                        }
                    })

                    await tx.image.update({
                        where: {
                            id: imageId
                        },
                        data: {
                            position: data.position
                        }
                    })
                }
            })
            return {
                success: true,
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeImage(imageId: string) {
        try {
            await this.prisma.$transaction(async tx => {
                const removedImage = await tx.image.delete({
                    where: { id: imageId },
                    select: {
                        collectionId: true,
                        path: true
                    }
                })

                await this.files.delete({ paths: [removedImage.path] })

                const images = await tx.image.findMany({
                    where: { collectionId: removedImage.collectionId },
                    select: { id: true },
                    orderBy: [{ position: 'asc' }]
                })

                for (const [index, image] of Object.entries(images)) {
                    await tx.image.update({
                        where: {
                            id: image.id
                        },
                        data: {
                            position: +index
                        }
                    })
                }
            })

            return {
                success: true,
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateCollection(collectionId: string, data: UpdateCollectionDto) {
        const updateCollectionQuery = {
            title: data.title,
            description: data.description,
            handle: this.url.getSlug(data.handle),
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            hidden: data.hidden
        }

        if (data.connectProducts !== undefined || data.disconnectProducts !== undefined) {
            Object.assign(updateCollectionQuery, {
                products: {
                    disconnect: data.disconnectProducts ?? [],
                    connect: data.connectProducts ?? []
                }
            })
        }

        try {
            await this.prisma.collection.update({
                where: {
                    id: collectionId
                },
                data: updateCollectionQuery
            })

            return {
                success: true
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Коллекция с таким handle уже существует", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeCollection(collectionId: string) {
        try {
            const collection = await this.prisma.collection.delete({
                where: { id: collectionId },
                select: {
                    images: {
                        select: {
                            path: true
                        }
                    }
                }
            })

            await this.files.delete({ paths: collection.images.map(image => image.path) })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}