import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/decorators/auth.decorator';
import { CreateProductnDto } from './dto/createProduct.dto';
import { UpdateImageDto } from './dto/updateImage.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) { }

    @Get('search')
    getProductsBySearch(
        @Query('q') q: string,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    ) {
        return this.productService.getProductsBySearch(q, limit, skip)
    }

    @Get(':productId')
    getProductById(
        @Param('productId') productId: string
    ) {
        return this.productService.getProductById(productId)
    }


    @Post('create')
    @Auth()
    createProduct(
        @Body() data: CreateProductnDto
    ) {
        return this.productService.createProduct(data)
    }

    @Post(':productId/uploadImages')
    @Auth()
    @UseInterceptors(FilesInterceptor('images'))
    uploadImages(
        @Param('productId') productId: string,
        @UploadedFiles() images: Express.Multer.File[],
    ) {
        return this.productService.uploadImages(productId, images)
    }

    @Put(':productId/updateImage/:imageId')
    @Auth()
    updateImage(
        @Param('imageId') imageId: string,
        @Body() data: UpdateImageDto
    ) {
        return this.productService.updateImage(imageId, data)
    }

    @Delete(':productId/removeImage/:imageId')
    @Auth()
    removeImage(
        @Param('imageId') imageId: string,
    ) {
        return this.productService.removeImage(imageId)
    }

    @Put(':productId')
    @Auth()
    updateProduct(
        @Param('productId') productId: string,
        @Body() data: UpdateProductDto
    ) {
        return this.productService.updateProduct(productId, data)
    }

    @Delete(':productId')
    @Auth()
    removeProduct(
        @Param('productId') productId: string,
    ) {
        return this.productService.removeProduct(productId)
    }
}