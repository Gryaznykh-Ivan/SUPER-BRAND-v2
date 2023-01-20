import * as FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
                userId: true
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
            userId: offer.userId
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
                        variant: {
                            option0: data.q?.match(/option0:'.+'/g)?.[0]?.split("'").at(-2) ?? undefined,
                            option1: data.q?.match(/option1:'.+'/g)?.[0]?.split("'").at(-2) ?? undefined,
                            option2: data.q?.match(/option2:'.+'/g)?.[0]?.split("'").at(-2) ?? undefined,
                        }
                    },
                    {
                        variant: {
                            product: {
                                title: {
                                    search: data.q ? `${data.q}*` : undefined,
                                }
                            }
                        }
                    }
                ],
                status: data.status
            },
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
            deliveryProfileId: data.deliveryProfileId,
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
}