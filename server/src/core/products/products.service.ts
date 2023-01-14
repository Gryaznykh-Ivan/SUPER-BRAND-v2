import * as FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateImageDto } from './dto/updateImage.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { firstValueFrom } from 'rxjs';
import { CreateOptionDto, UpdateOptionDto } from './dto/options.dto';
import { UrlService } from 'src/utils/urls/urls.service';

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService,
        private http: HttpService,
        private url: UrlService
    ) { }

    async getProductById(productId: string) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            select: {
                id: true,
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
                options: {
                    select: {
                        id: true,
                        title: true,
                        position: true,
                        values: {
                            select: {
                                id: true,
                                title: true,
                            }
                        }
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


    async getProductsBySearch(q: string, limit: number, skip: number, available: boolean) {
        const products = await this.prisma.product.findMany({
            where: {
                title: {
                    search: q ? `${q}*` : undefined,
                },
                vendor: {
                    search: q ? `${q}*` : undefined,
                },
                available: available
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

    async createProduct(data: CreateProductDto) {
        const createProductQuery = {
            title: data.title,
            description: data.description,
            available: data.available,
            vendor: data.vendor,
            handle: data.handle,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription
        }

        createProductQuery.handle = this.url.getSlug(createProductQuery.handle === undefined ? createProductQuery.handle : createProductQuery.title)

        if (createProductQuery.metaTitle === undefined) {
            createProductQuery.metaTitle = createProductQuery.title
        }

        if (data.connectCollections !== undefined) {
            Object.assign(createProductQuery, {
                collections: {
                    connect: data.connectCollections
                }
            })
        }

        try {
            const product = await this.prisma.product.create({
                data: createProductQuery
            })

            return {
                success: true,
                data: product.id
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Продукт с таким handle уже существует", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async uploadImages(productId: string, images: Express.Multer.File[], token: string) {
        const product = await this.prisma.product.findFirst({
            where: { id: productId },
            select: {
                title: true
            }
        })

        if (product === null) {
            throw new HttpException("Товар не найден", HttpStatus.BAD_REQUEST)
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
                where: { productId: productId },
                select: { position: true },
                orderBy: [{ position: 'desc' }]
            })

            const startPosition = lastImage !== null ? lastImage.position + 1 : 0
            const createImagesQuery = result.data.data.map((image, index) => ({
                name: image.name,
                src: image.url,
                alt: product.title,
                position: startPosition + index,
                productId: productId
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


    async updateImage(productId: string, imageId: string, data: UpdateImageDto) {
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
                            productId,
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
                        productId: true
                    }
                })

                const images = await tx.image.findMany({
                    where: { productId: removedImage.productId },
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


    async createOption(productId: string, data: CreateOptionDto) {
        const options = await this.prisma.option.findMany({
            where: { productId },
            select: { option: true },
            orderBy: [{ option: 'asc' }]
        })

        if (options.length >= 3) {
            throw new HttpException("Более 3 опций создать невозможно", HttpStatus.BAD_REQUEST)
        }

        let optionNumber = 0
        for (let i = 0; i < 3; i++) {
            if (options[i] !== undefined && options[i].option === i) continue

            optionNumber = i
            break
        }

        try {
            await this.prisma.$transaction(async tx => {
                const option = await tx.option.create({
                    data: {
                        title: data.title,
                        option: optionNumber,
                        position: options.length,
                        productId: productId,
                        values: {
                            create: {
                                title: "NEW"
                            }
                        }
                    }
                })

                await tx.variant.updateMany({
                    where: { [`option${option.option}`]: null, productId },
                    data: {
                        [`option${option.option}`]: "NEW"
                    }
                })
            })

            return {
                success: true
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Такая опция уже существует", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateOption(productId: string, optionId: string, data: UpdateOptionDto) {
        const OptionUpdateQuery = {
            title: data.title
        }

        if (data.createOptionValues !== undefined) {
            Object.assign(OptionUpdateQuery, {
                values: {
                    createMany: {
                        data: data.createOptionValues
                    }
                }
            })
        }

        try {
            await this.prisma.$transaction(async tx => {
                await tx.option.update({
                    where: { id: optionId },
                    data: OptionUpdateQuery
                })

                if (data.updateOptionValues !== undefined || data.deleteOptionValues !== undefined) {
                    for (const { id, title } of data.updateOptionValues ?? []) {
                        const optionValue = await tx.optionValue.findFirst({
                            where: { id },
                            select: {
                                title: true,
                                option: {
                                    select: {
                                        option: true
                                    }
                                }
                            }
                        })

                        await tx.optionValue.update({
                            where: { id },
                            data: {
                                title
                            }
                        })

                        await tx.variant.updateMany({
                            where: { [`option${optionValue.option.option}`]: optionValue.title },
                            data: {
                                [`option${optionValue.option.option}`]: title
                            }
                        })
                    }

                    for (const id of data.deleteOptionValues ?? []) {
                        const deletedOptionValue = await tx.optionValue.delete({
                            where: { id },
                            select: {
                                title: true,
                                option: {
                                    select: {
                                        option: true
                                    }
                                }
                            }
                        })

                        await tx.variant.deleteMany({
                            where: { [`option${deletedOptionValue.option.option}`]: deletedOptionValue.title },
                        })
                    }
                }

                if (data.createOptionValues !== undefined && data.createOptionValues.length !== 0) {
                    // const allOptions = await tx.option.findMany({
                    //     where: {
                    //         productId
                    //     },
                    //     select: {
                    //         option: true,
                    //         values: {
                    //             select: {
                    //                 title: true
                    //             }
                    //         },
                    //     },
                    //     orderBy: [{ option: 'asc' }]
                    // })

                    // // проверка количества вариантов
                    // const variantsQuantity = allOptions.reduce((a, c) => {
                    //     return a * c.values.length
                    // }, 1)

                    // if (variantsQuantity > 100) {
                    //     throw new HttpException("Максимальное количество вариантов 100", HttpStatus.BAD_REQUEST)
                    // }

                    // const allVariant = []
                    // for (const [key, option] of Object.entries(allOptions)) {
                    //     const index = +key
                    //     for (const optionValue of option.values) {
                    //         if (allVariant[index] === undefined) {
                    //             allVariant[index] = []
                    //         }

                    //         if (index > 0) {
                    //             for (let i = 0; i < allVariant[index - 1].length; i++) {
                    //                 if (Array.isArray(allVariant[index - 1][i]) === true) {
                    //                     allVariant[index].push([...allVariant[index - 1][i], optionValue.title])
                    //                 } else {
                    //                     allVariant[index].push([allVariant[index - 1][i], optionValue.title])
                    //                 }
                    //             }
                    //         } else {
                    //             allVariant[index].push(optionValue.title)
                    //         }
                    //     }
                    // }

                    // console.log(allVariant)

                    // await tx.variant.createMany({
                    //     data: allVariant.at(-1).map(v => ({
                    //         productId,
                    //         option0: v[0],
                    //         option1: v[1],
                    //         option2: v[2],
                    //     })),
                    //     skipDuplicates: true
                    // })
                }

                if (data.position !== undefined) {
                    const current = await tx.option.findFirst({
                        where: {
                            id: optionId
                        },
                        select: {
                            id: true,
                            position: true
                        }
                    })

                    await tx.option.updateMany({
                        where: {
                            productId,
                            position: data.position
                        },
                        data: {
                            position: current.position
                        }
                    })

                    await tx.option.update({
                        where: {
                            id: optionId
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
            console.log(e)
            throw new HttpException("Произошла ошибка на стороне сервера. Возможно вы превысили лимит в 100 вариантов", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeOption(optionId: string) {
        try {
            await this.prisma.$transaction(async tx => {
                const option = await tx.option.delete({
                    where: { id: optionId }
                })

                const options = await tx.option.findMany({
                    where: { productId: option.productId },
                    select: { id: true },
                    orderBy: [{ position: 'asc' }]
                })

                if (options.length !== 0) {
                    for (const [index, option] of Object.entries(options)) {
                        await tx.option.update({
                            where: {
                                id: option.id
                            },
                            data: {
                                position: +index
                            }
                        })
                    }

                    await tx.variant.updateMany({
                        where: {
                            productId: option.productId
                        },
                        data: {
                            [`option${option.option}`]: null
                        }
                    })
                } else {
                    await tx.variant.deleteMany({
                        where: {
                            productId: option.productId
                        }
                    })
                }

            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
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

        if (updateProductQuery.handle !== undefined) {
            updateProductQuery.handle = this.url.getSlug(updateProductQuery.handle)
        }

        if (data.connectCollections !== undefined || data.disconnectCollections !== undefined) {
            Object.assign(updateProductQuery, {
                collections: {
                    disconnect: data.disconnectCollections ?? [],
                    connect: data.connectCollections ?? [],
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
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Продукт с таким handle уже существует", HttpStatus.BAD_REQUEST)
                }
            }

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