import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ParserDBService } from '../../db/parser/parser.service';
import { SearchProductDto } from './dto/searchProduct.dto';

@Injectable()
export class ProductService {
    constructor(
        private prisma: ParserDBService,
    ) { }

    async getProductsBySearch(data: SearchProductDto) {
        const fulltextSearch = data.q ? data.q.replace(/[+\-<>()~*\"@]+/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(word => word.length >= 3).map(word => `+${word}*`).join(" ") : undefined
        
        const products = await this.prisma.product.findMany({
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
}