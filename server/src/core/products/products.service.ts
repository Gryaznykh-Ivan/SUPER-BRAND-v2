import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductnDto } from './dto/createProduct.dto';
import { UpdateImageDto } from './dto/updateImage.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getProductById(productId: string) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            select: {
                title: true,
                description: true,
                available: true,
                handle: true,
                metaTitle: true,
                metaDescription: true,
                vendor: true,
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
                },
                collections: {
                    select: {
                        id: true,
                        title: true
                    }
                },
                productOptions: {
                    select: {
                        id: true,
                        title: true,
                        position: true
                    },
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        })

        if (product === null) {
            throw new HttpException("Продукт не найден", HttpStatus.BAD_REQUEST)
        }

        return {
            success: true,
            data: product
        }
    }


    async getProductsBySearch(q: string, limit: number, skip: number) {
        const products = await this.prisma.product.findMany({
            where: {
                title: {
                    search: q ? `${q}*` : undefined,
                },
                vendor: {
                    search: q ? `${q}*` : undefined,
                }
            },
            select: {
                id: true,
                images: {
                    select: {
                        id: true,
                        alt: true,
                        src: true,
                    },
                    orderBy: {
                        position: 'asc'
                    },
                    take: 1
                },
                title: true,
                available: true,
                vendor: true,
                variants: {
                    select: {
                        _count: {
                            select: {
                                offers: {
                                    where: {
                                        status: OfferStatus.ACTIVE
                                    }
                                }
                            }
                        }
                    }
                }
            },
            skip: skip,
            take: limit > 20 ? 20 : limit,
            orderBy: [{
                createdAt: 'desc'
            }]
        })

        const result = products.map(product => ({
            id: product.id,
            image: product.images[0] ?? null,
            title: product.title,
            available: product.available,
            vendor: product.vendor,
            offersCount: product.variants.reduce((a, c) => {
                return a + c._count.offers
            }, 0)
        }))

        return {
            success: true,
            data: result
        }
    }

    async createProduct(data: CreateProductnDto) {
        const createProductQuery = {
            title: data.title,
            description: data.description,
            available: data.available,
            vendor: data.vendor,
            handle: data.handle,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription
        }

        if (data.connectCollections !== undefined) {
            Object.assign(createProductQuery, {
                collections: {
                    connect: data.connectCollections
                }
            })
        }

        if (data.connectImages !== undefined) {
            Object.assign(createProductQuery, {
                images: {
                    connect: data.connectImages
                }
            })
        }

        try {
            const product = await this.prisma.product.create({ data: createProductQuery })

            return {
                success: true,
                data: product.id
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async uploadImages(productId: string, images: Express.Multer.File[]) {
        throw new Error('Method not implemented.');
    }


    async updateImage(imageId: string, data: UpdateImageDto) {
        throw new Error('Method not implemented.');
    }

    async removeImage(imageId: string) {
        throw new Error('Method not implemented.');
    }

    async updateProduct(productId: string, data: UpdateProductDto) {
        const updateProductQuery = {
            title: data.title,
            description: data.description,
            available: data.available,
            vendor: data.vendor,
            handle: data.handle,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription
        }

        if (data.connectCollections !== undefined || data.disconnectCollections !== undefined) {
            Object.assign(updateProductQuery, {
                collections: {
                    disconnect: data.disconnectCollections ?? [],
                    connect: data.connectCollections ?? [],
                }
            })
        }

        if (data.connectImages !== undefined) {
            Object.assign(updateProductQuery, {
                images: {
                    connect: data.connectImages
                }
            })
        }

        try {
            await this.prisma.product.update({
                where: {
                    id: productId
                },
                data: updateProductQuery
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeProduct(productId: string) {
        try {
            await this.prisma.product.delete({
                where: { id: productId }
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}