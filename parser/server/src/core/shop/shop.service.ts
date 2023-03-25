import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferStatus, Role } from '@prisma-shop';
import { CreateOfferDto } from './dto/createOffer.dto';
import { UpdateOfferDto } from './dto/updateOffer.dto';
import { SearchOfferDto } from './dto/searchOffer.dto';
import { ShopDBService } from 'src/db/shop/shop.service';

@Injectable()
export class ShopService {
    constructor(
        private shop: ShopDBService,
    ) { }

    async getProducts(data: { skip: number; limit: number }) {
        const products = await this.shop.product.findMany({
            select: {
                id: true,
                title: true,
                options: {
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
                },
                variants: {
                    select: {
                        id: true,
                        option0: true,
                        option1: true,
                        option2: true,
                    }
                },
                metafields: {
                    select: {
                        id: true,
                        key: true,
                        value: true
                    }
                },
            },
            skip: data.skip,
            take: data.limit,
            orderBy: { createdAt: 'desc' }
        })

        return products.map(product => ({
            id: product.id,
            title: product.title,
            pfactor: product.metafields.find(metafield => metafield.key === "pfactor")?.value,
            stockx: product.metafields.find(metafield => metafield.key === "stockx")?.value,
            variants: product.variants.map(variant => ({
                id: variant.id,
                title: product.options.map(option => variant[`option${option.option}`]).join(' | ')
            }))
        }))

    }

    async createOffers(data: { variantId: string; userId: string; price: string; offerPrice: string; }) {
        try {
            await this.shop.$transaction(async tx => {
                const variant = await tx.variant.findUnique({
                    where: { id: data.variantId },
                    select: {
                        option0: true,
                        option1: true,
                        option2: true,
                        product: {
                            select: {
                                title: true,
                                options: {
                                    select: {
                                        title: true,
                                        option: true,
                                    },
                                    orderBy: [{ position: 'asc' }]
                                },
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
                        }
                    }
                })

                if (variant === null) {
                    throw new HttpException("Вариант не найден", HttpStatus.BAD_REQUEST)
                }

                const offerImageId = variant.product.images[0]?.id ?? null

                const createOfferQuery = {
                    productTitle: variant.product.title,
                    variantTitle: variant.product.options.map((option) => variant[`option${option.option}`]).join(' | '),
                    imageId: offerImageId,
                    variantId: data.variantId,
                    userId: data.userId,
                    status: OfferStatus.ACTIVE,
                    price: data.price,
                    offerPrice: data.offerPrice,
                    deliveryProfileId: "default"
                }

                await tx.offer.deleteMany({
                    where: {
                        variantId: data.variantId,
                        userId: data.userId,
                        status: {
                            notIn: [OfferStatus.SOLD, OfferStatus.RETURNING]
                        }
                    }
                })

                await tx.offer.createMany({
                    data: [createOfferQuery, createOfferQuery, createOfferQuery]
                })
            })

            return { success: true }
        } catch (e) {
            console.log(e)
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getStockxProvider() {
        try {
            const provider = await this.shop.user.upsert({
                where: {
                    id: "stockx"
                },
                create: {
                    id: "stockx",
                    role: Role.ADMIN,
                    firstName: "Stockx",
                    lastName: "Provider",
                    fullName: "Stockx Provider"
                },
                update: {
                    id: "stockx",
                    role: Role.ADMIN,
                    firstName: "Stockx",
                    lastName: "Provider",
                    fullName: "Stockx Provider"
                },
                select: {
                    id: true
                }
            })

            return provider
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}