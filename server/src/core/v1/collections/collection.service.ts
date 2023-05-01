import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-module/prisma.service';
import { OfferStatus } from '@prisma/client';
import { CollectionSortEnum, SearchDto } from './dto/search.dto';

@Injectable()
export class CollectionService {
    constructor(
        private prisma: PrismaService
    ) { }

    async getCollectionInfoByHandle(collectionHandle: string) {
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
            }
        })

        if (collection === null || collection.hidden === true) {
            throw new HttpException("Коллекция не найдена", HttpStatus.NOT_FOUND)
        }

        return {
            success: true,
            data: collection
        }
    }

    async getCollectionProductsByHandle(collectionHandle: string, data: SearchDto) {
        const { where, orederBy } = await this.collectionFilterAndSort(data)

        const collection = await this.prisma.collection.findUnique({
            where: {
                handle: collectionHandle,
            },
            select: {
                hidden: true,
                products: {
                    where: {
                        ...where,
                        available: true,
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
                                position: "asc"
                            }
                        },
                        variants: {
                            where: {
                                offers: {
                                    some: {
                                        status: OfferStatus.ACTIVE
                                    }
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
                                        price: "asc"
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        ...orederBy
                    },
                    skip: data.skip,
                    take: data.limit
                },
                _count: {
                    select: {
                        products: {
                            where: {
                                ...where,
                                available: true,
                            }
                        }
                    }
                }
            }
        })

        if (collection === null || collection.hidden === true) {
            throw new HttpException("Коллекция не найдена", HttpStatus.NOT_FOUND)
        }

        const mappedProducts = collection.products.map(product => ({
            handle: product.handle,
            title: product.title,
            vendor: product.vendor,
            image: product.images[0] ?? null,
            ...(
                product.variants.length !== 0
                    ? product.variants.sort((a, b) => Number(a.offers[0].price) - Number(b.offers[0].price))[0].offers[0]
                    : { price: null, compareAtPrice: null }
            )
        }))

        return {
            success: true,
            data: {
                currentPage: Math.floor(data.skip / data.limit) + 1,
                totalPages: Math.ceil(collection._count.products / data.limit),
                products: mappedProducts
            }
        }
    }

    private async collectionFilterAndSort(data: SearchDto) {
        const where = {}
        const orederBy = {}

        switch (data.sort) {
            case CollectionSortEnum.relevance:
                orederBy["id"] = "asc"
                break;
            case CollectionSortEnum.popular:
                orederBy["productIsFavored"] = { _count: "desc" }
                break;
            case CollectionSortEnum.new:
                orederBy["createdAt"] = "desc"
                break;
            case CollectionSortEnum.old:
                orederBy["createdAt"] = "asc"
                break;
            case CollectionSortEnum.priceAsc:
                orederBy["minPrice"] = { sort: "asc", nulls: "last" }
                break;
            case CollectionSortEnum.priceDesc:
                orederBy["minPrice"] = { sort: "desc", nulls: "last" }
                break;
        }

        if (data.maxPrice !== undefined || data.minPrice !== undefined) {
            where["minPrice"] = {
                lte: data.maxPrice,
                gte: data.minPrice
            }
        }

        return { where, orederBy }
    }
}