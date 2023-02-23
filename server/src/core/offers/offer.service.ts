import * as FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOfferDto } from './dto/createOffer.dto';
import { UpdateOfferDto } from './dto/updateOffer.dto';
import { firstValueFrom } from 'rxjs';
import { UrlService } from 'src/utils/urls/urls.service';
import { SearchOfferDto } from './dto/searchOffer.dto';

@Injectable()
export class OfferService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getOfferById(offerId: string) {
        const offer = await this.prisma.offer.findUnique({
            where: { id: offerId },
            select: {
                id: true,
                variant: {
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
                                }
                            }
                        }
                    }
                },
                variantId: true,
                price: true,
                compareAtPrice: true,
                offerPrice: true,
                comment: true,
                status: true,
                deliveryProfileId: true,
                userId: true,
                order: {
                    select: {
                        orderId: true
                    }
                }
            }
        })

        if (offer === null) {
            throw new HttpException("Оффер не найдена", HttpStatus.BAD_REQUEST)
        }

        const result = {
            id: offer.id,
            variantId: offer.variantId,
            price: offer.price,
            compareAtPrice: offer.compareAtPrice,
            offerPrice: offer.offerPrice,
            comment: offer.comment,
            deliveryProfileId: offer.deliveryProfileId,
            status: offer.status,
            userId: offer.userId,
            orderId: offer.order?.orderId ?? null
        }

        return {
            success: true,
            data: result
        }
    }

    async getOffersBySearch(data: SearchOfferDto) {
        const offers = await this.prisma.offer.findMany({
            where: {
                OR: [
                    {
                        user: {
                            fullName: {
                                search: data.q ? `${data.q}*` : undefined,
                            }
                        }
                    },
                    {
                        AND: [
                            {
                                variant: {
                                    option0: this.getParamValue(data.q, "option0"),
                                    option1: this.getParamValue(data.q, "option1"),
                                    option2: this.getParamValue(data.q, "option2"),
                                    product: {
                                        id: this.getParamValue(data.q, "productId")
                                    }
                                }
                            },
                            {
                                variant: {
                                    product: {
                                        title: {
                                            search: this.getClearSearchQuery(data.q) ? `${this.getClearSearchQuery(data.q)}*` : undefined,
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ],
                status: {
                    equals: data.status,
                    not: data.notStatus
                },
                deliveryProfileId: {
                    equals: data.deliveryProfileId,
                    not: data.notDeliveryProfileId
                }
            },
            select: {
                id: true,
                deliveryProfile: {
                    select: {
                        id: true,
                        title: true
                    }
                },
                variant: {
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
                                        position: true
                                    },
                                    orderBy: {
                                        position: 'asc'
                                    },
                                    take: 1
                                }
                            }
                        },
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
                    }
                },
                price: true,
                offerPrice: true,
                status: true,
                user: {
                    select: {
                        fullName: true,
                    }
                },
            },
            skip: data.skip,
            take: data.limit,
            orderBy: [{
                createdAt: 'desc'
            }]
        })

        const result = offers.map(offer => ({
            id: offer.id,
            product: offer.variant.product.title,
            variant: offer.variant.product.options.map((option) => offer.variant[`option${option.option}`]).join(' | '),
            price: offer.price,
            offerPrice: offer.offerPrice,
            status: offer.status,
            user: offer.user?.fullName ?? null,
            image: offer.variant.images[0] ?? offer.variant.product.images[0] ?? null,
            deliveryProfile: offer.deliveryProfile
        }))

        return {
            success: true,
            data: result
        }
    }

    async createOffer(data: CreateOfferDto) {
        const createOfferQuery = {
            variantId: data.variantId,
            userId: data.userId,
            status: data.status,
            price: data.price,
            offerPrice: data.offerPrice,
            deliveryProfileId: data.deliveryProfileId ?? "default", // дефолтный профиль
            compareAtPrice: data.compareAtPrice,
            comment: data.comment,
        }

        try {
            const offer = await this.prisma.offer.create({
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

    async updateOffer(offerId: string, data: UpdateOfferDto) {
        const offer = await this.prisma.offer.findUnique({
            where: { id: offerId },
            select: {
                id: true,
                status: true
            }
        })

        if (offer === null) {
            throw new HttpException("Оффер не найден", HttpStatus.BAD_REQUEST)
        }

        if (offer.status === OfferStatus.SOLD) {
            throw new HttpException("Редактирование проданных офферов запрещено, так как это будет влиять на историю продаж", HttpStatus.BAD_REQUEST)
        }

        const updateOfferQuery = {
            variantId: data.variantId,
            userId: data.userId,
            status: data.status,
            price: data.price,
            offerPrice: data.offerPrice,
            deliveryProfileId: data.deliveryProfileId,
            compareAtPrice: data.compareAtPrice,
            comment: data.comment,
        }

        try {
            await this.prisma.offer.update({
                where: {
                    id: offerId
                },
                data: updateOfferQuery
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeOffer(offerId: string) {
        const offer = await this.prisma.offer.findUnique({
            where: { id: offerId },
            select: {
                id: true,
                status: true
            }
        })

        if (offer === null) {
            throw new HttpException("Оффер не найден", HttpStatus.BAD_REQUEST)
        }

        if (offer.status === OfferStatus.SOLD) {
            throw new HttpException("Удалить проданый оффер невозможно, так как это будет влиять на историю продаж", HttpStatus.BAD_REQUEST)
        }

        try {
            await this.prisma.offer.delete({
                where: { id: offerId }
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на стороне сервера", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    private getParamValue(q: string | undefined, param: string) {
        if (typeof q !== 'string') return undefined
        if (q.length === 0) return undefined

        const regex = new RegExp(param + ":'([^']+)'");
        const match = regex.exec(q);

        if (match) {
            return match[1];
        }

        return undefined;
    }

    private getClearSearchQuery(q: string | null) {
        if (typeof q !== 'string') return undefined
        if (q.length === 0) return undefined

        return q.replace(/\S+:'([^']+)'/gi, "").trim();
    }
}