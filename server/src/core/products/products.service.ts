import * as FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductnDto } from './dto/createProduct.dto';
import { UpdateImageDto } from './dto/updateImage.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { firstValueFrom } from 'rxjs';
import { CreateOptionDto, UpdateOptionDto } from './dto/options.dto';

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService,
        private http: HttpService
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

        createProductQuery.handle = this.getSlug(createProductQuery.handle === undefined ? createProductQuery.handle : createProductQuery.title)

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
            const result = await this.prisma.$transaction(async tx => {
                const removedImage = await tx.image.delete({
                    where: { id: imageId },
                    select: {
                        productId: true
                    }
                })

                const images = await this.prisma.image.findMany({
                    where: { productId: removedImage.productId },
                    select: { id: true },
                    orderBy: [{ position: 'asc' }]
                })

                await this.prisma.image.updateMany({
                    data: images.map((image, index) => ({ id: image.id, position: index }))
                })

                return true
            })

            return {
                success: result,
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async createOption(productId: string, data: CreateOptionDto) {
        const options = await this.prisma.productOption.findMany({
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
            await this.prisma.productOption.create({
                data: {
                    title: data.title,
                    option: optionNumber,
                    position: options.length,
                    productId: productId
                }
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateOption(productId: string, optionId: string, data: UpdateOptionDto) {
        try {
            if (data.title !== undefined) {
                await this.prisma.productOption.update({
                    where: { id: optionId },
                    data: {
                        title: data.title,
                    }
                })
            }

            if (data.position !== undefined) {
                await this.prisma.$transaction(async tx => {
                    const current = await tx.productOption.findFirst({
                        where: {
                            id: optionId
                        },
                        select: {
                            id: true,
                            position: true
                        }
                    })

                    await tx.productOption.updateMany({
                        where: {
                            productId,
                            position: data.position
                        },
                        data: {
                            position: current.position
                        }
                    })

                    await tx.productOption.update({
                        where: {
                            id: optionId
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

    async removeOption(optionId: string) {
        try {
            await this.prisma.$transaction(async tx => {
                const option = await tx.productOption.delete({
                    where: { id: optionId }
                })

                const options = await tx.productOption.findMany({
                    where: { productId: option.productId },
                    select: { id: true },
                    orderBy: [{ position: 'asc' }]
                })

                await tx.productOption.updateMany({
                    data: options.map((option, index) => ({ id: option.id, position: index }))
                })

                await tx.variant.updateMany({
                    where: {
                        productId: option.productId
                    },
                    data: {
                        [`option${option.option}`]: null
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
            updateProductQuery.handle = this.getSlug(updateProductQuery.handle)
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

    private getSlug(string: string) {
        return string.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '')
    }
}