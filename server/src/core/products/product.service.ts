import * as FormData from 'form-data';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateImageDto } from './dto/updateImage.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { firstValueFrom } from 'rxjs';
import { CreateOptionDto, UpdateOptionDto } from './dto/options.dto';
import { UrlService } from 'src/utils/urls/urls.service';
import { SearchProductDto } from './dto/searchProduct.dto';
import { FilesService } from 'src/utils/files/files.service';

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService,
        private url: UrlService,
        private files: FilesService
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
                SKU: true,
                barcode: true,
                metafields: {
                    select: {
                        id: true,
                        key: true,
                        value: true
                    }
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


    async getProductsBySearch(data: SearchProductDto) {
        const fulltextSearch = data.q ? data.q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim() : undefined
        const whereQuery = {
            AND: [{
                OR: [
                    {
                        title: {
                            search: fulltextSearch ? `${fulltextSearch}*` : undefined,
                        },
                        vendor: {
                            search: fulltextSearch ? `${fulltextSearch}*` : undefined,
                        },
                    },
                    {
                        id: {
                            endsWith: fulltextSearch,
                        }
                    }
                ]
            }, {
                available: data.available,
            }]
        }

        if (data.notInCollectionId !== undefined) {
            Object.assign(whereQuery, {
                collections: {
                    none: {
                        id: data.notInCollectionId
                    }
                }
            })
        }

        const products = await this.prisma.product.findMany({
            where: whereQuery,
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
            skip: data.skip,
            take: data.limit,
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
        if ((data.title !== undefined && data.title.length > 255) || (data.metaTitle !== undefined && data.metaTitle.length > 255)) {
            throw new HttpException("Максимальная длина названия 255 символов", HttpStatus.BAD_REQUEST)
        }

        const createProductQuery = {
            title: data.title,
            description: data.description,
            available: data.available,
            vendor: data.vendor,
            handle: data.handle,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            SKU: data.SKU,
            barcode: data.barcode
        }

        createProductQuery.handle = this.url.getSlug(createProductQuery.handle === undefined ? createProductQuery.title : createProductQuery.handle)

        if (createProductQuery.metaTitle === undefined || createProductQuery.metaDescription === undefined) {
            const snippets = await this.prisma.setting.findMany({ where: { setting: "SEO-SNIPPET" } })
            const metaTitle = snippets.find(snippet => snippet.title === "title")?.value
            const metaDescription = snippets.find(snippet => snippet.title === "description")?.value

            if (createProductQuery.metaTitle === undefined) {
                if (metaTitle !== undefined) {
                    createProductQuery.metaTitle = metaTitle
                        .replaceAll("[title]", createProductQuery.title.replace(/[^a-zA-Z0-9 ]/gi, "") || "")
                        .replaceAll("[vendor]", createProductQuery.vendor || "")
                        .replaceAll("[SKU]", createProductQuery.SKU || "")
                        .replace(/\s+/g, " ")
                        .trim()
                } else {
                    createProductQuery.metaTitle = createProductQuery.title
                }
            }

            if (createProductQuery.metaDescription === undefined) {
                if (metaDescription !== undefined) {
                    createProductQuery.metaDescription = metaDescription
                        .replaceAll("[title]", createProductQuery.title.replace(/[^a-zA-Z0-9 ]/gi, "") || "")
                        .replaceAll("[vendor]", createProductQuery.vendor || "")
                        .replaceAll("[SKU]", createProductQuery.SKU || "")
                        .replace(/\s+/g, " ")
                        .trim()
                }
            }
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


    async uploadImages(productId: string, images: Express.Multer.File[]) {
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
            const result = await this.files.upload(images, 100);
            if (result.success !== true) {
                throw new HttpException("Загрузить картинки не удалось", HttpStatus.INTERNAL_SERVER_ERROR)
            }

            await this.prisma.$transaction(async tx => {
                const lastImage = await tx.image.findFirst({
                    where: { productId: productId },
                    select: { position: true },
                    orderBy: [{ position: 'desc' }]
                })

                const startPosition = lastImage !== null ? lastImage.position + 1 : 0
                const createImagesQuery = result.data.map((image, index) => ({
                    path: image.path,
                    src: image.src,
                    blurhash: image.blurhash,
                    alt: product.title,
                    position: startPosition + index,
                    productId: productId
                }))

                await tx.image.createMany({
                    data: createImagesQuery
                })

                if (startPosition === 0) {
                    const offers = await tx.offer.findMany({
                        where: {
                            variant: {
                                productId: productId
                            }
                        },
                        select: {
                            id: true,
                            image: {
                                select: {
                                    id: true
                                }
                            }
                        }
                    })

                    for (const offer of offers) {
                        await tx.offer.update({
                            where: {
                                id: offer.id
                            },
                            data: {
                                image: {
                                    [offer.image !== null ? "update" : "create"]: {
                                        src: createImagesQuery[0].src,
                                        alt: createImagesQuery[0].alt,
                                        path: createImagesQuery[0].path,
                                        blurhash: createImagesQuery[0].blurhash,
                                        position: 0
                                    }
                                }
                            }
                        })
                    }
                }
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

                    // Если основное изображение продукта изменилось - меняем изоюражения вариантов
                    if (data.position === 0 || current.position === 0) {
                        const product = await tx.product.findUnique({
                            where: { id: productId },
                            select: {
                                images: {
                                    select: {
                                        id: true,
                                        src: true,
                                        alt: true,
                                        blurhash: true,
                                        path: true,
                                        position: true,
                                    },
                                    orderBy: {
                                        position: 'asc'
                                    },
                                    take: 1
                                }
                            }
                        })

                        const offers = await tx.offer.findMany({
                            where: {
                                variant: {
                                    productId: productId
                                }
                            },
                            select: {
                                id: true,
                                image: {
                                    select: {
                                        id: true
                                    }
                                }
                            }
                        })

                        for (const offer of offers) {
                            await tx.offer.update({
                                where: {
                                    id: offer.id
                                },
                                data: {
                                    image: {
                                        [offer.image !== null ? "update" : "create"]: {
                                            src: product.images[0].src,
                                            alt: product.images[0].alt,
                                            blurhash: product.images[0].blurhash,
                                            path: product.images[0].path,
                                            position: 0
                                        }
                                    }
                                }
                            })
                        }
                    }
                }
            })

            return {
                success: true,
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeImage(productId: string, imageId: string) {
        try {
            await this.prisma.$transaction(async tx => {
                const removedImage = await tx.image.update({
                    where: { id: imageId },
                    data: {
                        productId: null
                    },
                    select: {
                        productId: true,
                        path: true,
                        position: true,
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

                //удаление изображений у офферов если удаляется изображение продукта
                if (removedImage.position === 0) {
                    const product = await tx.product.findUnique({
                        where: { id: productId },
                        select: {
                            images: {
                                select: {
                                    id: true,
                                    src: true,
                                    alt: true,
                                    blurhash: true,
                                    path: true,
                                    position: true,
                                },
                                orderBy: {
                                    position: 'asc'
                                },
                                take: 1
                            }
                        }
                    })

                    if (product.images.length !== 0) {
                        const offers = await tx.offer.findMany({
                            where: {
                                variant: {
                                    productId: productId
                                }
                            },
                            select: {
                                id: true,
                                image: {
                                    select: {
                                        id: true
                                    }
                                }
                            }
                        })

                        for (const offer of offers) {
                            await tx.offer.update({
                                where: {
                                    id: offer.id
                                },
                                data: {
                                    image: product.images.length !== 0 ? {
                                        [offer.image !== null ? "update" : "create"]: {
                                            src: product.images[0].src,
                                            alt: product.images[0].alt,
                                            path: product.images[0].path,
                                            blurhash: product.images[0].blurhash,
                                            position: 0
                                        }
                                    } : {
                                        disconnect: true
                                    }
                                }
                            })
                        }
                    }
                }
            })

            return {
                success: true,
            }
        } catch (e) {
            console.log(e)
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async createOption(productId: string, data: CreateOptionDto) {
        const cOptions = await this.prisma.option.findMany({
            where: { productId },
            select: { option: true },
            orderBy: [{ option: 'asc' }]
        })

        if (cOptions.length >= 3) {
            throw new HttpException("Более 3 опций создать невозможно", HttpStatus.BAD_REQUEST)
        }

        let optionNumber = 0
        for (let i = 0; i < 3; i++) {
            if (cOptions[i] !== undefined && cOptions[i].option === i) continue

            optionNumber = i
            break
        }

        try {
            await this.prisma.$transaction(async tx => {
                const option = await tx.option.create({
                    data: {
                        title: data.title,
                        option: optionNumber,
                        position: cOptions.length,
                        productId: productId,
                        values: {
                            createMany: {
                                data: data.createOptionValues.map(option => ({ title: option }))
                            }
                        }
                    },
                    select: {
                        productId: true,
                        product: {
                            select: {
                                SKU: true
                            }
                        }
                    }
                })


                // Получаем список оставшихся опций
                const options = await tx.option.findMany({
                    where: { productId: option.productId },
                    select: {
                        id: true,
                        option: true,
                        values: {
                            select: {
                                id: true,
                                title: true
                            }
                        }
                    },
                    orderBy: { position: 'asc' }
                })


                // Удаляем все варианты, так как старых вариантов больше нет
                await tx.variant.deleteMany({
                    where: { productId: option.productId },
                })

                // Если остались какие то опции - создаем варианты на основе оставшихся опций
                if (options.length !== 0) {
                    const values = options.map(option => option.values.map(value => ({ ...value, option: option.option })))
                    const combinations = this.getCombinations(values)

                    await tx.variant.createMany({
                        data: combinations.map(combination => ({
                            productId: option.productId,
                            option0: combination.find(c => c.option === 0)?.title ?? null,
                            option1: combination.find(c => c.option === 1)?.title ?? null,
                            option2: combination.find(c => c.option === 2)?.title ?? null,
                            SKU: option.product.SKU
                        }))
                    })
                }

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

            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Опции и знначения опций должны быть унимальными", HttpStatus.BAD_REQUEST)
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
                // Обновляем опцию и сразу создаем значения у опции
                await tx.option.update({
                    where: { id: optionId },
                    data: OptionUpdateQuery
                })

                // обновление названий значений опций
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
                        where: { [`option${optionValue.option.option}`]: optionValue.title, productId },
                        data: {
                            [`option${optionValue.option.option}`]: title,
                        }
                    })

                    // Меняем название варианта у офферов
                    const offers = await tx.offer.findMany({
                        where: {
                            status: {
                                notIn: [OfferStatus.SOLD, OfferStatus.NO_MATCH, OfferStatus.RETURNING]
                            },
                            variant: {
                                productId: productId,
                            },
                            variantTitle: {
                                contains: optionValue.title,
                            }
                        },
                        select: {
                            id: true,
                            variantTitle: true,
                            variant: {
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
                            }
                        }
                    })

                    for (const offer of offers) {
                        await tx.offer.update({
                            where: { id: offer.id },
                            data: {
                                variantTitle: offer.variant.product.options.map((option) => offer.variant[`option${option.option}`]).join(' | ')
                            }
                        })
                    }
                }

                // удаление значений опций
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
                        where: { [`option${deletedOptionValue.option.option}`]: deletedOptionValue.title, productId },
                    })
                }

                // swap позиции у опций
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


                // Далее синхронизация опций и вариантов. Создаем варианты в соответствии с опциями
                const product = await tx.product.findUnique({
                    where: { id: productId },
                    select: {
                        SKU: true,
                        options: {
                            select: {
                                option: true,
                                values: {
                                    select: {
                                        id: true,
                                        title: true
                                    }
                                }
                            },
                            orderBy: { position: 'asc' }
                        }
                    }
                })

                const variantToCreate = []
                const values = product.options.map(option => option.values.map(value => ({ ...value, option: option.option })))
                const combinations = this.getCombinations(values)
                const allProductVariants = await tx.variant.findMany({
                    where: {
                        productId: productId
                    },
                    select: {
                        option0: true,
                        option1: true,
                        option2: true
                    }
                })

                for (const combination of combinations) {
                    const variant = allProductVariants.find(variant =>
                        variant.option0 === (combination.find(c => c.option === 0)?.title ?? null) &&
                        variant.option1 === (combination.find(c => c.option === 1)?.title ?? null) &&
                        variant.option2 === (combination.find(c => c.option === 2)?.title ?? null)
                    )

                    if (variant !== undefined) continue

                    variantToCreate.push({
                        productId: productId,
                        option0: combination.find(c => c.option === 0)?.title ?? null,
                        option1: combination.find(c => c.option === 1)?.title ?? null,
                        option2: combination.find(c => c.option === 2)?.title ?? null,
                        SKU: product.SKU
                    })
                }

                await tx.variant.createMany({
                    data: variantToCreate
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
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new HttpException("Опции и знначения опций должны быть унимальными", HttpStatus.BAD_REQUEST)
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeOption(optionId: string) {
        try {
            await this.prisma.$transaction(async tx => {
                // Удаление опции
                const option = await tx.option.delete({
                    where: { id: optionId },
                    select: {
                        productId: true,
                        option: true,
                        values: {
                            select: {
                                id: true,
                                title: true
                            }
                        },
                        product: {
                            select: {
                                SKU: true
                            }
                        }
                    }
                })

                // Получаем список оставшихся опций
                const options = await tx.option.findMany({
                    where: { productId: option.productId },
                    select: {
                        id: true,
                        option: true,
                        values: {
                            select: {
                                id: true,
                                title: true
                            }
                        }
                    },
                    orderBy: { position: 'asc' }
                })

                // Меняем позиции. Tеперь они начинаются с 0
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

                // Удаляем все варианты, так как старых вариантов больше нет
                await tx.variant.deleteMany({
                    where: { productId: option.productId },
                })

                // Если остались какие то опции - создаем варианты на основе оставшихся опций
                if (options.length !== 0) {
                    const values = options.map(option => option.values.map(value => ({ ...value, option: option.option })))
                    const combinations = this.getCombinations(values)

                    await tx.variant.createMany({
                        data: combinations.map(combination => ({
                            productId: option.productId,
                            option0: combination.find(c => c.option === 0)?.title ?? null,
                            option1: combination.find(c => c.option === 1)?.title ?? null,
                            option2: combination.find(c => c.option === 2)?.title ?? null,
                            SKU: option.product.SKU
                        }))
                    })
                }

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


    async updateProduct(productId: string, data: UpdateProductDto) {
        const updateProductQuery = {
            title: data.title,
            description: data.description,
            available: data.available,
            vendor: data.vendor,
            handle: data.handle,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            SKU: data.SKU,
            barcode: data.barcode
        }

        if (updateProductQuery.handle !== undefined) {
            updateProductQuery.handle = this.url.getSlug(updateProductQuery.handle)
        }

        if ((data.title !== undefined && data.title.length > 255) || (data.metaTitle !== undefined && data.metaTitle.length > 255)) {
            throw new HttpException("Максимальная длина названия 255 символов", HttpStatus.BAD_REQUEST)
        }

        if (data.connectCollections !== undefined || data.disconnectCollections !== undefined) {
            Object.assign(updateProductQuery, {
                collections: {
                    disconnect: data.disconnectCollections ?? [],
                    connect: data.connectCollections ?? [],
                }
            })
        }

        if (data.createMetafields !== undefined || data.deleteMetafields !== undefined) {
            Object.assign(updateProductQuery, {
                metafields: {
                    deleteMany: data.deleteMetafields ?? [],
                    createMany: {
                        data: data.createMetafields ?? []
                    },
                }
            })
        }

        try {
            await this.prisma.$transaction(async tx => {
                // обновляем снипет если title, SKU или vendor был изменен
                if (
                    (updateProductQuery.metaTitle === undefined || updateProductQuery.metaDescription === undefined) &&
                    (updateProductQuery.title !== undefined || updateProductQuery.vendor !== undefined || updateProductQuery.SKU !== undefined)
                ) {
                    const snippets = await tx.setting.findMany({ where: { setting: "SEO-SNIPPET" } })
                    const metaTitle = snippets.find(snippet => snippet.title === "title")?.value
                    const metaDescription = snippets.find(snippet => snippet.title === "description")?.value

                    const productSnippetInfo = await tx.product.findUnique({
                        where: { id: productId },
                        select: {
                            SKU: true,
                            title: true,
                            vendor: true
                        }
                    })

                    const title = updateProductQuery.title || productSnippetInfo.title
                    const vendor = updateProductQuery.vendor || productSnippetInfo.vendor
                    const SKU = updateProductQuery.SKU || productSnippetInfo.SKU

                    if (updateProductQuery.metaTitle === undefined) {
                        if (metaTitle !== undefined) {
                            updateProductQuery.metaTitle = metaTitle
                                .replaceAll("[title]", title.replace(/[^a-zA-Z0-9 ]/gi, "") || "")
                                .replaceAll("[vendor]", vendor || "")
                                .replaceAll("[SKU]", SKU || "")
                                .replace(/\s+/g, " ")
                                .trim()
                        } else {
                            updateProductQuery.metaTitle = productSnippetInfo.title
                        }
                    }

                    if (updateProductQuery.metaDescription === undefined) {
                        if (metaDescription !== undefined) {
                            updateProductQuery.metaDescription = metaDescription
                                .replaceAll("[title]", title.replace(/[^a-zA-Z0-9 ]/gi, "") || "")
                                .replaceAll("[vendor]", vendor || "")
                                .replaceAll("[SKU]", SKU || "")
                                .replace(/\s+/g, " ")
                                .trim()
                        }
                    }
                }

                // Обновляем название офферов
                if (data.title !== undefined) {
                    await tx.offer.updateMany({
                        where: {
                            status: {
                                notIn: [OfferStatus.SOLD, OfferStatus.NO_MATCH, OfferStatus.RETURNING]
                            },
                            variant: {
                                productId
                            }
                        },
                        data: {
                            productTitle: data.title
                        }
                    })
                }

                // Oбновляем метаполя
                for (const metafield of data.updateMetafields ?? []) {
                    await tx.metafield.update({
                        where: {
                            id: metafield.id
                        },
                        data: {
                            key: metafield.key,
                            value: metafield.value,
                        }
                    })
                }

                await tx.product.update({
                    where: {
                        id: productId
                    },
                    data: updateProductQuery
                })
            })

            return {
                success: true
            }
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    if (e.meta?.target === "Metafield_productId_key_key") {
                        throw new HttpException("Ключи у метаполей должны быть уникальными", HttpStatus.BAD_REQUEST)
                    } else {
                        throw new HttpException("Продукт с таким handle уже существует", HttpStatus.BAD_REQUEST)
                    }
                }
            }

            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeProduct(productId: string) {
        try {
            await this.prisma.$transaction(async tx => {
                await tx.product.delete({
                    where: { id: productId }
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

    private getCombinations = (arrays: { option: number; id: string; title: string; }[][]) => {
        return arrays.reduce((result: { option: number; id: string; title: string; }[][], array: { option: number; id: string; title: string; }[]) => {
            return result.reduce((newResult: { option: number; id: string; title: string; }[][], combination: { option: number; id: string; title: string; }[]) => {
                return newResult.concat(array.map((num: { option: number; id: string; title: string; }) => [...combination, num]));
            }, []);
        }, [[]]);
    }
}