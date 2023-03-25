import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { Role } from '@prisma-shop';
import { Auth } from 'src/decorators/auth.decorator';
import { SearchProductDto } from './dto/searchProduct.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) { }

    @Get('search')
    @Auth([Role.ADMIN])
    getProductsBySearch(
        @Query(new ValidationPipe({ transform: true })) data: SearchProductDto
    ) {
        return this.productService.getProductsBySearch(data)
    }
}