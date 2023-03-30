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
import { Console } from 'console';

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
                type: true,
                SKU: true,
                barcode: true,
                metafields: {
                    select: {
                        id: true,
                        key: true,
                        value: true,
                        createdAt: true,
                    },
                    orderBy: {
                        createdAt: 'desc'
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
                                position: true,
                                title: true,
                            },
                            orderBy: {
                                position: 'asc'
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
        const fulltextSearch = data.q ? data.q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length > 3).map(word => `+${word}*`).join(" ") : undefined
        const whereQuery = {
            AND: [{
                OR: [
                    {
                        title: {
                            search: fulltextSearch ? fulltextSearch : undefined,
                        },
                        vendor: {
                            search: fulltextSearch ? fulltextSearch : undefined,
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
                type: true,
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
        if (data.title.length > 255) {
            throw new HttpException("Максимальная длина названия 255 символов", HttpStatus.BAD_REQUEST)
        }

        const createProductQuery = {
            title: data.title,
            description: data.description,
            available: data.available,
            vendor: data.vendor,
            type: data.type,
            handle: this.url.getSlug(data.handle),
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            SKU: data.SKU,
            barcode: data.barcode
        }


        // todo: вынести эту логику на клиент
        if (data.defaultSnippet === true) {
            if (data.metaTitle !== undefined && data.metaTitle.length > 255) {
                throw new HttpException("Максимальная длина мета названия 255 символов", HttpStatus.BAD_REQUEST)
            }

            const snippets = await this.prisma.setting.findMany({ where: { setting: "SEO-SNIPPET" } })
            const sMetaTitle = snippets.find(snippet => snippet.title === "title")?.value
            const sMetaDescription = snippets.find(snippet => snippet.title === "description")?.value

            createProductQuery.handle = this.url.getSlug(data.title)
            createProductQuery.metaTitle = sMetaTitle.replaceAll("[title]", createProductQuery.title.replace(/[^a-zA-Z0-9 ]/gi, "") || "")
                .replaceAll("[vendor]", createProductQuery.vendor || "")
                .replaceAll("[SKU]", createProductQuery.SKU || "")
                .replace(/\s+/g, " ")
                .trim();
            createProductQuery.metaDescription = sMetaDescription
                .replaceAll("[title]", createProductQuery.title.replace(/[^a-zA-Z0-9 ]/gi, "") || "")
                .replaceAll("[vendor]", createProductQuery.vendor || "")
                .replaceAll("[SKU]", createProductQuery.SKU || "")
                .replace(/\s+/g, " ")
                .trim();
        }

        if (createProductQuery.handle === undefined || createProductQuery.metaTitle === undefined || createProductQuery.metaDescription === undefined) {
            throw new HttpException("Поиск и SEO не заполнено", HttpStatus.BAD_REQUEST)
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

                // У товара появляется изображение - оно должно проявляться и у оффера
                if (startPosition === 0) {
                    const offers = await tx.offer.findMany({
                        where: {
                            variant: {
                                productId: productId
                            }
                        },
                        select: {
                            id: true
                        }
                    })

                    const image = await tx.image.findFirst({
                        where: { productId },
                        select: {
                            id: true
                        },
                        orderBy: {
                            position: 'asc'
                        }
                    })

                    await tx.offer.updateMany({
                        where: {
                            id: {
                                in: offers.map(offer => offer.id)
                            }
                        },
                        data: {
                            imageId: image.id
                        }
                    })
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

                    // Если основное изображение продукта изменилось - меняем изображения вариантов
                    if (data.position === 0 || current.position === 0) {
                        const product = await tx.product.findUnique({
                            where: { id: productId },
                            select: {
                                images: {
                                    select: {
                                        id: true
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

                        await tx.offer.updateMany({
                            where: {
                                id: {
                                    in: offers.map(offer => offer.id)
                                }
                            },
                            data: {
                                imageId: product.images[0].id
                            }
                        })
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
                    where: { productId },
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
                                    id: true
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

                    await tx.offer.updateMany({
                        where: {
                            id: {
                                in: offers.map(offer => offer.id)
                            }
                        },
                        data: {
                            imageId: product.images.length !== 0 ? product.images[0].id : null
                        }
                    })
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
                                data: data.createOptionValues.map((option, i) => ({ title: option, position: i }))
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
                            },
                            orderBy: {
                                position: 'asc'
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

        try {
            await this.prisma.$transaction(async tx => {
                if (data.createOptionValues !== undefined) {
                    const lastOptionValue = await tx.optionValue.findFirst({
                        where: { optionId },
                        select: { position: true },
                        orderBy: [{ position: 'desc' }]
                    })

                    const startPosition = lastOptionValue !== null ? lastOptionValue.position + 1 : 0

                    Object.assign(OptionUpdateQuery, {
                        values: {
                            createMany: {
                                data: data.createOptionValues.map((value, index) => ({ title: value.title, position: startPosition + index }))
                            }
                        }
                    })
                }

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

                if (data.reorderOptionValue !== undefined) {
                    const current = await tx.optionValue.findFirst({
                        where: {
                            id: data.reorderOptionValue.id
                        },
                        select: {
                            id: true,
                            position: true
                        }
                    })

                    await tx.optionValue.updateMany({
                        where: {
                            optionId,
                            position: data.reorderOptionValue.position
                        },
                        data: {
                            position: current.position
                        }
                    })

                    await tx.optionValue.update({
                        where: {
                            id: data.reorderOptionValue.id
                        },
                        data: {
                            position: data.reorderOptionValue.position
                        }
                    })
                }

                // удаление значений опций
                if (data.deleteOptionValues !== undefined) {
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

                    // Убираем пустоту между positon, если она образовалась
                    const optionValues = await tx.optionValue.findMany({
                        where: { optionId },
                        select: { id: true },
                        orderBy: [{ position: 'asc' }]
                    })

                    for (const [index, value] of Object.entries(optionValues)) {
                        await tx.optionValue.update({
                            where: {
                                id: value.id
                            },
                            data: {
                                position: +index
                            }
                        })
                    }
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
                                    },
                                    orderBy: {
                                        position: 'asc'
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
                            },
                            orderBy: {
                                position: 'asc'
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
        if (data.title !== undefined && data.title.length > 255) {
            throw new HttpException("Максимальная длина названия 255 символов", HttpStatus.BAD_REQUEST)
        }

        if (data.metaTitle !== undefined && data.metaTitle.length > 255) {
            throw new HttpException("Максимальная длина мета названия 255 символов", HttpStatus.BAD_REQUEST)
        }

        const updateProductQuery = {
            title: data.title,
            description: data.description,
            available: data.available,
            vendor: data.vendor,
            type: data.type,
            handle: this.url.getSlug(data.handle),
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            SKU: data.SKU,
            barcode: data.barcode
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
            console.log(e)

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