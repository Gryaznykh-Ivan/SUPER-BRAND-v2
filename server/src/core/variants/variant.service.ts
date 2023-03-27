import * as FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';
import { CreateVariantDto } from './dto/createVariant.dto';
import { UpdateImageDto } from './dto/updateImage.dto';
import { UpdateVariantDto } from './dto/updateVariant.dto';
import { SearchVariantDto } from './dto/searchVariant.dto';
import { FilesService } from 'src/utils/files/files.service';


@Injectable()
export class VariantService {
    constructor(
        private prisma: PrismaService,
        private files: FilesService,
    ) { }


    async getVariantsBySearch(data: SearchVariantDto) {
        const fulltextSearch = data.q ? data.q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 1).map(word => `+${word}*`).join(" ") : undefined
        const variants = await this.prisma.product.findMany({
            where: {
                title: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                },
                vendor: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                },
                variants: {
                    some: {}
                }
            },
            select: {
                id: true,
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
                },
                title: true,
                variants: {
                    select: {
                        id: true,
                        option0: true,
                        option1: true,
                        option2: true,
                    }
                },
                options: {
                    select: {
                        title: true,
                        option: true,
                    },
                    orderBy: [{ position: 'asc' }]
                },
            },
            skip: data.skip,
            take: data.limit,
            orderBy: [{
                createdAt: 'desc'
            }],
        })

        const result = variants.map(product => ({
            id: product.id,
            image: product.images[0] ?? null,
            title: product.title,
            variants: product.variants.map(variant => ({
                id: variant.id,
                title: product.options.map((option) => variant[`option${option.option}`]).join(' | ')
            }))
        }))

        return {
            success: true,
            data: result
        }
    }

    async getVariants(productId: string) {
        const options = await this.prisma.option.findMany({
            where: { productId },
            select: {
                id: true,
                option: true,
                values: {
                    select: {
                        title: true,
                        position: true,
                    },
                    orderBy: {
                        position: 'asc'
                    }
                }
            },
            orderBy: {
                position: 'asc'
            }
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
                    where: {
                        status: OfferStatus.ACTIVE
                    },
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
            }
        })

        // Сортировка вариантов по позиции опции
        const sortedVariants = variants.sort((a, b) => {
            for (const option of options) {
                const optionName = `option${option.option}`
                const valueA = a[optionName]
                const valueB = b[optionName]
                if (valueA && valueB) {
                    const optionValues = option.values.map(v => v.title)
                    const indexA = optionValues.indexOf(valueA)
                    const indexB = optionValues.indexOf(valueB)
                    if (indexA !== indexB) {
                        return indexA - indexB
                    }
                }
            }
            return 0
        })

        const result = sortedVariants.map(variant => ({
            id: variant.id,
            title: options.map(option => variant[`option${option.option}`]).join(' | '),
            price: variant.offers[0]?.price ?? 0,
            image: variant.images[0] ?? null
        }))

        return {
            success: true,
            data: result
        }
    }

    async getOptions(productId: string) {
        const options = await this.prisma.option.findMany({
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

    async getPreview(variantId: string) {
        const variant = await this.prisma.variant.findUnique({
            where: { id: variantId },
            select: {
                id: true,
                option0: true,
                option1: true,
                option2: true,
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
                },
                product: {
                    select: {
                        id: true,
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
                        },
                        title: true,
                        options: {
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
            product: variant.product.title,
            productId: variant.product.id,
            image: variant.images[0] ?? variant.product.images[0] ?? null,
            variant: variant.product.options.map((option) => variant[`option${option.option}`]).join(' | '),
        }

        return {
            success: true,
            data: result
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
                        options: {
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
            options: variant.product.options
        }

        return {
            success: true,
            data: result
        }
    }

    async createVariant(data: CreateVariantDto) {
        const product = await this.prisma.product.findUnique({
            where: {
                id: data.productId,
            },
            select: {
                SKU: true,
                barcode: true,
                variants: {
                    where: {
                        option0: data.option0,
                        option1: data.option1,
                        option2: data.option2
                    },
                    take: 1
                },
                options: {
                    select: {
                        title: true,
                        option: true,
                        values: {
                            select: {
                                title: true
                            },
                            orderBy: {
                                position: 'asc'
                            }
                        }
                    }
                }
            }
        })

        if (product === null) {
            throw new HttpException("Продукт не найден", HttpStatus.BAD_REQUEST)
        }

        if (product.variants.length !== 0) {
            throw new HttpException("Вариант должен быть уникальным", HttpStatus.BAD_REQUEST)
        }

        for (let i = 0; i < 3; i++) {
            if (data[`option${i}`] !== undefined) {
                const option = product.options.find(c => c.option === i)

                if (option === undefined || option.values.some(c => c.title === data[`option${i}`]) === false) {
                    throw new HttpException(`${option.title} не соответствует опциям`, HttpStatus.INTERNAL_SERVER_ERROR)
                }
            }
        }

        const createVariantQuery = {
            option0: data.option0,
            option1: data.option1,
            option2: data.option2,
            SKU: data.SKU || product.SKU,
            barcode: data.barcode || product.barcode,
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
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async uploadImages(variantId: string, images: Express.Multer.File[]) {
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
            const result = await this.files.upload(images, 100);
            if (result.success !== true) {
                throw new HttpException("Загрузить картинки не удалось", HttpStatus.INTERNAL_SERVER_ERROR)
            }

            const lastImage = await this.prisma.image.findFirst({
                where: { variantId: variantId },
                select: { position: true },
                orderBy: [{ position: 'desc' }]
            })

            const startPosition = lastImage !== null ? lastImage.position + 1 : 0
            const createImagesQuery = result.data.map((image, index) => ({
                path: image.path,
                src: image.src,
                blurhash: image.blurhash,
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

    async removeImage(variantId: string, imageId: string) {
        try {
            await this.prisma.$transaction(async tx => {
                const removedImage = await tx.image.update({
                    where: { id: imageId },
                    data: {
                        variantId: null
                    },
                    select: {
                        variantId: true,
                        path: true,
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
        const options = await this.prisma.option.findMany({
            where: {
                product: {
                    variants: {
                        some: {
                            id: variantId
                        }
                    }
                }
            },
            select: {
                title: true,
                option: true,
                values: {
                    select: {
                        title: true
                    },
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        })

        for (let i = 0; i < 3; i++) {
            if (data[`option${i}`] !== undefined) {
                const option = options.find(c => c.option === i)

                if (option === undefined || option.values.some(c => c.title === data[`option${i}`]) === false) {
                    throw new HttpException(`${option.title} не соответствует опциям`, HttpStatus.INTERNAL_SERVER_ERROR)
                }
            }
        }

        const updateVariantQuery = {
            option0: data.option0,
            option1: data.option1,
            option2: data.option2,
            SKU: data.SKU,
            barcode: data.barcode,
        }

        try {
            await this.prisma.$transaction(async tx => {
                const variant = await tx.variant.update({
                    where: {
                        id: variantId
                    },
                    data: updateVariantQuery,
                    select: {
                        option0: true,
                        option1: true,
                        option2: true,
                        product: {
                            select: {
                                options: {
                                    select: {
                                        title: true,
                                        option: true,

                                    },
                                    orderBy: [{ position: 'asc' }]
                                }
                            }
                        }
                    }
                })

                const existCheck = await tx.variant.findMany({
                    where: {
                        option0: variant.option0,
                        option1: variant.option1,
                        option2: variant.option2,
                    },
                    take: 2
                })

                if (existCheck.length > 1) {
                    throw new HttpException("Вариант должен быть уникальным", HttpStatus.INTERNAL_SERVER_ERROR)
                }

                await tx.offer.updateMany({
                    where: {
                        status: {
                            notIn: [OfferStatus.SOLD, OfferStatus.NO_MATCH, OfferStatus.RETURNING]
                        },
                        variantId: variantId
                    },
                    data: {
                        variantTitle: variant.product.options.map((option) => variant[`option${option.option}`]).join(' | ')
                    }
                })

            })

            return {
                success: true
            }
        } catch (e) {
            if (e.name === HttpException.name) {
                throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeVariant(variantId: string) {
        try {
            await this.prisma.$transaction(async tx => {
                await this.prisma.variant.delete({
                    where: { id: variantId }
                })

                await tx.offer.updateMany({
                    where: {
                        status: {
                            notIn: [OfferStatus.SOLD, OfferStatus.NO_MATCH, OfferStatus.RETURNING]
                        },
                        variantId: null
                    },
                    data: {
                        status: OfferStatus.NO_MATCH
                    }
                })
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}