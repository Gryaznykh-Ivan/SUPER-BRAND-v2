import * as FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';
import { CreateVariantDto } from './dto/createVariant.dto';
import { UpdateImageDto } from './dto/updateImage.dto';
import { UpdateVariantDto } from './dto/updateVariant.dto';


@Injectable()
export class VariantService {
    constructor(
        private prisma: PrismaService,
        private http: HttpService
    ) { }

    async getVariants(productId: string) {
        const options = await this.prisma.productOption.findMany({
            where: { productId },
            select: {
                id: true,
                title: true,
                option: true,
                position: true
            },
            orderBy: [{ position: 'asc' }]
        })

        const variants = await this.prisma.variant.findMany({
            where: {
                productId: productId
            },
            select: {
                id: true,
                option0: true,
                option1: true,
                option2: true,
                offers: {
                    select: {
                        price: true
                    },
                    orderBy: [{ price: 'asc' }],
                    take: 1
                },
                images: {
                    select: {
                        id: true,
                        src: true,
                        alt: true,
                        position: true,
                    },
                    orderBy: {
                        position: 'asc'
                    },
                    take: 1
                }
            },
            orderBy: [
                { option0: 'asc' },
                { option1: 'asc' },
                { option2: 'asc' },
            ]
        })

        const result = {
            options: options,
            variants: variants.map(variant => ({
                id: variant.id,
                option0: variant.option0,
                option1: variant.option1,
                option2: variant.option2,
                price: variant.offers[0]?.price ?? 0,
                image: variant.images[0] ?? null
            }))
        }

        return {
            success: true,
            data: result
        }
    }

    async getOptions(productId: string) {
        const options = await this.prisma.productOption.findMany({
            where: { productId },
            select: {
                id: true,
                title: true,
                option: true,
                position: true
            },
            orderBy: [{ position: 'asc' }]
        })

        return {
            success: true,
            data: options
        }
    }

    async getVariantById(variantId: string) {
        const variant = await this.prisma.variant.findUnique({
            where: { id: variantId },
            select: {
                id: true,
                option0: true,
                option1: true,
                option2: true,
                barcode: true,
                SKU: true,
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
                product: {
                    select: {
                        productOptions: {
                            select: {
                                id: true,
                                title: true,
                                option: true,
                                position: true
                            },
                            orderBy: [{ position: 'asc' }]
                        }
                    }
                }
            }
        })

        if (variant === null) {
            throw new HttpException("Вариант не найден", HttpStatus.BAD_REQUEST)
        }

        const result = {
            id: variant.id,
            option0: variant.option0,
            option1: variant.option1,
            option2: variant.option2,
            barcode: variant.barcode,
            SKU: variant.SKU,
            images: variant.images,
            options: variant.product.productOptions
        }

        return {
            success: true,
            data: result
        }
    }

    async createVariant(data: CreateVariantDto) {
        const createVariantQuery = {
            option0: data.option0,
            option1: data.option1,
            option2: data.option2,
            SKU: data.SKU,
            barcode: data.barcode,
            productId: data.productId
        }


        try {
            const variant = await this.prisma.variant.create({
                data: createVariantQuery
            })

            return {
                success: true,
                data: variant.id
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Такой вариант уже существует", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async uploadImages(variantId: string, images: Express.Multer.File[], token: string) {
        const variant = await this.prisma.variant.findFirst({
            where: { id: variantId },
            select: {
                product: {
                    select: {
                        title: true
                    }
                }
            }
        })

        if (variant === null) {
            throw new HttpException("Вариант не найден", HttpStatus.BAD_REQUEST)
        }

        try {
            const formData = new FormData();
            for (const image of images) {
                formData.append('files', image.buffer, { filename: image.originalname });
            }

            const headers = {
                ...formData.getHeaders(),
                "Content-Length": formData.getLengthSync(),
                "authorization": token
            };

            const result = await firstValueFrom(this.http.post("http://static.sb.com/upload", formData, { headers }));
            if (result.data.success !== true) {
                throw new HttpException("Загрузить картинки не удалось", HttpStatus.INTERNAL_SERVER_ERROR)
            }

            const lastImage = await this.prisma.image.findFirst({
                where: { variantId: variantId },
                select: { position: true },
                orderBy: [{ position: 'desc' }]
            })

            const startPosition = lastImage !== null ? lastImage.position + 1 : 0
            const createImagesQuery = result.data.data.map((image, index) => ({
                name: image.name,
                src: image.url,
                alt: variant.product.title,
                position: startPosition + index,
                variantId: variantId
            }))

            await this.prisma.image.createMany({
                data: createImagesQuery
            })

            return {
                success: true
            }
        } catch (e) {
            console.log(e)
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async updateImage(variantId: string, imageId: string, data: UpdateImageDto) {
        try {
            if (data.src !== undefined || data.alt !== undefined) {
                await this.prisma.image.update({
                    where: { id: imageId },
                    data: {
                        src: data.src,
                        alt: data.alt
                    }
                })
            }

            if (data.position !== undefined) {
                await this.prisma.$transaction(async tx => {
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
                            variantId,
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
                })
            }

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
                        variantId: true
                    }
                })

                const images = await tx.image.findMany({
                    where: { variantId: removedImage.variantId },
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


    async updateVariant(variantId: string, data: UpdateVariantDto) {
        const updateVariantQuery = {
            option0: data.option0,
            option1: data.option1,
            option2: data.option2,
            SKU: data.SKU,
            barcode: data.barcode,
        }


        try {
            await this.prisma.variant.update({
                where: {
                    id: variantId
                },
                data: updateVariantQuery
            })

            return {
                success: true
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Такой вариант уже существует", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeVariant(variantId: string) {
        try {
            await this.prisma.variant.delete({
                where: { id: variantId }
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}