import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-module/prisma.service';
import { OfferStatus } from '@prisma/client';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class CollectionService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getCollectionByHandle(collectionHandle: string, data: SearchDto) {
        const collection = await this.prisma.collection.findUnique({
            where: {
                handle: collectionHandle
            },
            select: {
                handle: true,
                title: true,
                description: true,
                metaTitle: true,
                metaDescription: true,
                hidden: true,
                products: {
                    where: {
                        available: true
                    },
                    select: {
                        handle: true,
                        title: true,
                        vendor: true,
                        type: true,
                        images: {
                            select: {
                                alt: true,
                                src: true,
                                blurhash: true,
                            },
                            take: 1,
                            orderBy: {
                                position: 'asc'
                            }
                        },
                        variants: {
                            where: {
                                offers: {
                                    some: {}
                                }
                            },
                            select: {
                                offers: {
                                    where: {
                                        status: OfferStatus.ACTIVE
                                    },
                                    select: {
                                        price: true,
                                        compareAtPrice: true,
                                    },
                                    take: 1,
                                    orderBy: {
                                        price: 'asc'
                                    }
                                }
                            },

                        },
                    },
                    skip: data.skip,
                    take: data.limit,
                },
                _count: {
                    select: {
                        products: {
                            where: {
                                available: true
                            }
                        }
                    }
                }
            }
        })

        if (collection === null || collection.hidden === true) {
            throw new HttpException("Коллекция не найдена", HttpStatus.NOT_FOUND)
        }

        // console.log(JSON.stringify(collection, null, 2))

        const result = {
            ...collection,
            currentPage: Math.floor(data.skip / data.limit) + 1,
            totalPages: Math.ceil(collection._count.products / data.limit),
            products: collection.products.map(product => ({
                handle: product.handle,
                title: product.title,
                vendor: product.vendor,
                image: product.images[0] ?? null,
                ...(
                    product.variants.length !== 0 && product.variants.some(variant => variant.offers.length !== 0) == true
                        ? product.variants.sort((a, b) => Number(a.offers[0].price) - Number(b.offers[0].price))[0].offers[0]
                        : { price: null, compareAtPrice: null }
                )
            }))
        }

        return {
            success: true,
            data: result
        }
    }
}