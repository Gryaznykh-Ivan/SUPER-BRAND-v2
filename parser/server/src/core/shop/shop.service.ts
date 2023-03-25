import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferStatus } from '@prisma-shop';
import { CreateOfferDto } from './dto/createOffer.dto';
import { UpdateOfferDto } from './dto/updateOffer.dto';
import { SearchOfferDto } from './dto/searchOffer.dto';
import { ShopDBService } from 'src/db/shop/shop.service';

@Injectable()
export class ShopService {
    constructor(
        private shop: ShopDBService,
    ) { }

    async getProducts(data: { skip: number, limit: number }) {
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

    async createOffer(data: CreateOfferDto) {
        const variant = await this.shop.variant.findUnique({
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
                                id: true,
                                alt: true,
                                src: true,
                                path: true,
                                blurhash: true,
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
    
        const offerImage = variant.product.images[0] ?? null
    
        const createOfferQuery = {
            productTitle: variant.product.title,
            variantTitle: variant.product.options.map((option) => variant[`option${option.option}`]).join(' | '),
            image: offerImage !== null ? {
                create: {
                    src: offerImage.src,
                    alt: offerImage.alt,
                    path: offerImage.path,
                    blurhash: offerImage.blurhash,
                    position: 0
                }
            } : undefined,
            variantId: data.variantId,
            userId: data.userId,
            status: data.status,
            price: data.price,
            offerPrice: data.offerPrice,
            deliveryProfileId: data.deliveryProfileId ?? "default", // дефолтный профиль
            compareAtPrice: data.compareAtPrice,
            comment: data.comment
        }
    
        try {
            const offer = await this.shop.offer.create({
                data: createOfferQuery
            })
    
            return {
                success: true,
                data: offer.id
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}




// async getOfferById(offerId: string) {
//     const offer = await this.prisma.offer.findUnique({
//         where: { id: offerId },
//         select: {
//             id: true,
//             productTitle: true,
//             variantTitle: true,
//             image: {
//                 select: {
//                     id: true,
//                     src: true,
//                     alt: true,
//                 }
//             },
//             variant: {
//                 select: {
//                     productId: true
//                 }
//             },
//             variantId: true,
//             price: true,
//             compareAtPrice: true,
//             offerPrice: true,
//             comment: true,
//             status: true,
//             deliveryProfileId: true,
//             userId: true,
//             order: {
//                 select: {
//                     id: true
//                 }
//             }
//         }
//     })

//     if (offer === null) {
//         throw new HttpException("Оффер не найдена", HttpStatus.BAD_REQUEST)
//     }

//     const result = {
//         id: offer.id,
//         product: offer.productTitle,
//         variant: offer.variantTitle,
//         image: offer.image,
//         variantId: offer.variantId,
//         productId: offer.variant?.productId ?? null,
//         price: offer.price,
//         compareAtPrice: offer.compareAtPrice,
//         offerPrice: offer.offerPrice,
//         comment: offer.comment,
//         status: offer.status,
//         deliveryProfileId: offer.deliveryProfileId,
//         userId: offer.userId ?? null,
//         orderId: offer.order?.id ?? null
//     }

//     return {
//         success: true,
//         data: result
//     }
// }

// async getOffersBySearch(data: SearchOfferDto) {
//     const fulltextSearch = data.q ? data.q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length >= 3).map(word => `+${word}*`).join(" ") : undefined
//     const offers = await this.prisma.offer.findMany({
//         where: {
//             AND: [{
//                 OR: [{
//                     productTitle: {
//                         search: fulltextSearch ? fulltextSearch : undefined,
//                     },
//                 }, {
//                     variantTitle: {
//                         contains: fulltextSearch,
//                     }
//                 }, {
//                     variantId: fulltextSearch
//                 }, {
//                     userId: fulltextSearch
//                 }, {
//                     user: data.q ? {
//                         fullName: {
//                             search: fulltextSearch ? fulltextSearch : undefined,
//                         }
//                     } : {}
//                 }],
//             },
//             {
//                 status: {
//                     equals: data.status,
//                     not: data.notStatus
//                 },
//             }, {
//                 deliveryProfileId: {
//                     equals: data.deliveryProfileId,
//                     not: data.notDeliveryProfileId
//                 }
//             }, {
//                 variantId: data.variantId
//             }, {
//                 userId: data.userId
//             }]
//         },
//         select: {
//             id: true,
//             deliveryProfile: {
//                 select: {
//                     id: true,
//                     title: true
//                 }
//             },
//             productTitle: true,
//             variantTitle: true,
//             image: {
//                 select: {
//                     id: true,
//                     src: true,
//                     alt: true,
//                 }
//             },
//             price: true,
//             offerPrice: true,
//             status: true,
//             user: {
//                 select: {
//                     fullName: true,
//                 }
//             },
//         },
//         skip: data.skip,
//         take: data.limit,
//         orderBy: [{
//             createdAt: 'desc'
//         }]
//     })

//     const result = offers.map(offer => ({
//         id: offer.id,
//         product: offer.productTitle,
//         variant: offer.variantTitle, //variant.product.options.map((option) => offer.variant[`option${option.option}`]).join(' | ')
//         price: offer.price,
//         offerPrice: offer.offerPrice,
//         status: offer.status,
//         user: offer.user?.fullName ?? null,
//         image: offer.image,
//         deliveryProfile: offer.deliveryProfile
//     }))

//     return {
//         success: true,
//         data: result
//     }
// }

// async updateOffer(offerId: string, data: UpdateOfferDto) {
//     const offer = await this.prisma.offer.findUnique({
//         where: { id: offerId },
//         select: {
//             id: true,
//             status: true,
//             variantId: true,
//             image: {
//                 select: {
//                     id: true
//                 }
//             }
//         }
//     })

//     if (offer === null) {
//         throw new HttpException("Оффер не найден", HttpStatus.BAD_REQUEST)
//     }

//     if (offer.status === OfferStatus.SOLD) {
//         throw new HttpException("Редактирование проданных офферов запрещено, так как это будет искажать историю продаж", HttpStatus.BAD_REQUEST)
//     }

//     if (offer.status === OfferStatus.RETURNING) {
//         throw new HttpException("Изменить возвращающийся оффер невозможно", HttpStatus.BAD_REQUEST)
//     }

//     if (offer.status === OfferStatus.NO_MATCH && data.variantId === undefined && data.status !== undefined) {
//         throw new HttpException("Невозможно изменить статус у оффера без соответствия. Сначала выберите товар, которому этот оффер принадлежит", HttpStatus.BAD_REQUEST)
//     }

//     const updateOfferQuery = {
//         userId: data.userId,
//         status: data.status,
//         price: data.price,
//         offerPrice: data.offerPrice,
//         deliveryProfileId: data.deliveryProfileId,
//         compareAtPrice: data.compareAtPrice,
//         comment: data.comment,
//     }

//     if (data.variantId !== undefined && data.variantId !== offer.variantId) {
//         const variant = await this.prisma.variant.findUnique({
//             where: { id: data.variantId },
//             select: {
//                 option0: true,
//                 option1: true,
//                 option2: true,
//                 product: {
//                     select: {
//                         title: true,
//                         options: {
//                             select: {
//                                 title: true,
//                                 option: true,
//                             },
//                             orderBy: [{ position: 'asc' }]
//                         },
//                         images: {
//                             select: {
//                                 id: true,
//                                 alt: true,
//                                 src: true,
//                                 path: true,
//                                 blurhash: true,
//                             },
//                             orderBy: {
//                                 position: 'asc'
//                             },
//                             take: 1
//                         }
//                     }
//                 }
//             }
//         })

//         if (variant === null) {
//             throw new HttpException("Вариант не найден", HttpStatus.BAD_REQUEST)
//         }

//         const offerImage = variant.product.images[0] ?? null

//         Object.assign(updateOfferQuery, {
//             status: (offer.status === OfferStatus.NO_MATCH && data.status === undefined) ? OfferStatus.ACTIVE : data.status,
//             productTitle: variant.product.title,
//             variantTitle: variant.product.options.map((option) => variant[`option${option.option}`]).join(' | '),
//             variantId: data.variantId,
//             image: offerImage !== null ? {
//                 [offer.image !== null ? "update" : "create"]: {
//                     src: offerImage.src,
//                     alt: offerImage.alt,
//                     blurhash: offerImage.blurhash,
//                     path: offerImage.path,
//                     position: 0
//                 }
//             } : {
//                 disconnect: true
//             }
//         })
//     }

//     try {
//         await this.prisma.offer.update({
//             where: {
//                 id: offerId
//             },
//             data: updateOfferQuery
//         })

//         return {
//             success: true
//         }
//     } catch (e) {

//         console.log(e)
//         throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
//     }
// }

// async removeOffer(offerId: string) {
//     const offer = await this.prisma.offer.findUnique({
//         where: { id: offerId },
//         select: {
//             id: true,
//             status: true
//         }
//     })

//     if (offer === null) {
//         throw new HttpException("Оффер не найден", HttpStatus.BAD_REQUEST)
//     }

//     if (offer.status === OfferStatus.SOLD) {
//         throw new HttpException("Удалить проданый оффер невозможно, так как это будет искажать историю продаж", HttpStatus.BAD_REQUEST)
//     }

//     if (offer.status === OfferStatus.RETURNING) {
//         throw new HttpException("Удалить невернувшийся оффер невозможно", HttpStatus.BAD_REQUEST)
//     }

//     try {
//         await this.prisma.offer.delete({
//             where: { id: offerId }
//         })

//         return {
//             success: true
//         }
//     } catch (e) {
//         throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
//     }
// }