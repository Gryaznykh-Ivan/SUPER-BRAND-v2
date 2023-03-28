import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BotAction, BotStatus, ProductStatus } from '@prisma-parser';
import { ParserDBService } from '../../db/parser/parser.service';
import { ShopService } from '../shop/shop.service';
import { SearchProductDto } from './dto/searchProduct.dto';
import { UpdateProductsDto } from './dto/updateProducts.dto';

@Injectable()
export class ProductService {
    constructor(
        private parser: ParserDBService,
        private shop: ShopService,
    ) { }

    async getProductsBySearch(data: SearchProductDto) {
        const fulltextSearch = data.q ? data.q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length >= 3).map(word => `+${word}*`).join(" ") : undefined

        const products = await this.parser.product.findMany({
            where: {
                status: data.status,
                title: {
                    search: fulltextSearch ? fulltextSearch : undefined,
                }
            },
            select: {
                id: true,
                title: true,
                pfactor: true,
                pamount: true,
                status: true,
                stockx: true,
                updatedAt: true
            },
            skip: data.skip,
            take: data.limit,
            orderBy: [{
                createdAt: 'desc'
            }]
        })

        return {
            success: true,
            data: products
        }
    }

    async updateProducts(data: UpdateProductsDto) {
        const bot = await this.parser.bot.findUnique({
            where: { id: process.env.BOT_ID },
            select: {
                status: true
            }
        })

        if (bot.status === BotStatus.ACTIVE) {
            throw new HttpException("Бот запущен. Дождитесь окончания работы", HttpStatus.BAD_REQUEST)
        }

        try {
            await this.parser.$transaction(async tx => {
                await tx.product.deleteMany({
                    where: {
                        id: {
                            in: data.ids
                        }
                    }
                })

                const provider = await this.shop.getStockxProvider()
                const products = await this.shop.getProductsByIds({ ids: data.ids, providerId: provider.id })
                for (const product of products) {
                    if (product.stockx === undefined) continue;

                    await tx.product.create({
                        data: {
                            id: product.id,
                            title: product.title,
                            pfactor: isNaN(+product.pfactor) === false ? product.pfactor : "1",
                            pamount: isNaN(+product.pamount) === false ? Math.floor(Number(product.pamount) > 10 ? 10 : Number(product.pamount)) : 3,
                            stockx: product.stockx,
                            status: ProductStatus.WAITING_STOCKX_DATA,
                            variants: {
                                createMany: {
                                    data: product.variants.map(variant => ({
                                        id: variant.id,
                                        title: variant.title,
                                        searchTitle: variant.title.replace(/[^0-9.]/gi, "") || variant.title,
                                        shopPrice: variant.shopPrice,
                                        shopAmount: variant.shopAmount,
                                    }))
                                }
                            }
                        }
                    })
                }
            })

            return {
                success: true
            }
        } catch (e) {
            throw new HttpException("Произошла ошибка на сервере", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}