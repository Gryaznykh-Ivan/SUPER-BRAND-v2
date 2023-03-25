import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Right, Role } from '@prisma/client';
import { Auth } from 'src/decorators/auth.decorator';
import { Token } from 'src/decorators/token.decorator';
import { ParseBooleanPipe } from 'src/pipes/parse-boolean.pipe';
import { CreateProductDto } from './dto/createProduct.dto';
import { CreateOptionDto, ReorderOptionValueDto, UpdateOptionDto } from './dto/options.dto';
import { SearchProductDto } from './dto/searchProduct.dto';
import { UpdateImageDto } from './dto/updateImage.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) { }

    @Get('search')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_READ])
    getProductsBySearch(
        @Query(new ValidationPipe({ transform: true })) data: SearchProductDto
    ) {
        return this.productService.getProductsBySearch(data)
    }

    @Get(':productId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_READ])
    getProductById(
        @Param('productId') productId: string
    ) {
        return this.productService.getProductById(productId)
    }


    @Post('create')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE])
    createProduct(
        @Body() data: CreateProductDto
    ) {
        return this.productService.createProduct(data)
    }

    @Post(':productId/uploadImages')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE, Right.MEDIA_UPLOAD])
    @UseInterceptors(FilesInterceptor('images'))
    uploadImages(
        @Param('productId') productId: string,
        @UploadedFiles() images: Express.Multer.File[],
    ) {
        return this.productService.uploadImages(productId, images)
    }

    @Put(':productId/updateImage/:imageId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE])
    updateImage(
        @Param('productId') productId: string,
        @Param('imageId') imageId: string,
        @Body() data: UpdateImageDto
    ) {
        return this.productService.updateImage(productId, imageId, data)
    }

    @Delete(':productId/removeImage/:imageId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE, Right.MEDIA_DELETE])
    removeImage(
        @Param('productId') productId: string,
        @Param('imageId') imageId: string,
    ) {
        return this.productService.removeImage(productId, imageId)
    }

    @Post(':productId/createOption')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE])
    createOption(
        @Param('productId') productId: string,
        @Body() data: CreateOptionDto
    ) {
        return this.productService.createOption(productId, data)
    }

    @Put(':productId/updateOption/:optionId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE])
    updateOption(
        @Param('productId') productId: string,
        @Param('optionId') optionId: string,
        @Body() data: UpdateOptionDto
    ) {
        return this.productService.updateOption(productId, optionId, data)
    }


    @Delete(':productId/removeOption/:optionId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE])
    removeOption(
        @Param('optionId') optionId: string,
    ) {
        return this.productService.removeOption(optionId)
    }

    @Put(':productId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE])
    updateProduct(
        @Param('productId') productId: string,
        @Body() data: UpdateProductDto
    ) {
        return this.productService.updateProduct(productId, data)
    }

    @Delete(':productId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE])
    removeProduct(
        @Param('productId') productId: string,
    ) {
        return this.productService.removeProduct(productId)
    }
}