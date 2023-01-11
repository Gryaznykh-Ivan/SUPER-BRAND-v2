import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/decorators/auth.decorator';
import { Token } from 'src/decorators/token.decorator';
import { ParseBooleanPipe } from 'src/pipes/parse-boolean.pipe';
import { CreateProductnDto } from './dto/createProduct.dto';
import { CreateOptionDto, UpdateOptionDto } from './dto/options.dto';
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
        @Query('available', ParseBooleanPipe) available?: boolean
    ) {
        return this.productService.getProductsBySearch(q, limit, skip, available)
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
        @Token() token: string
    ) {
        return this.productService.uploadImages(productId, images, token)
    }

    @Put(':productId/updateImage/:imageId')
    @Auth()
    updateImage(
        @Param('productId') productId: string,
        @Param('imageId') imageId: string,
        @Body() data: UpdateImageDto
    ) {
        return this.productService.updateImage(productId, imageId, data)
    }

    @Delete(':productId/removeImage/:imageId')
    @Auth()
    removeImage(
        @Param('imageId') imageId: string,
    ) {
        return this.productService.removeImage(imageId)
    }

    @Post(':productId/createOption')
    @Auth()
    createOption(
        @Param('productId') productId: string,
        @Body() data: CreateOptionDto
    ) {
        return this.productService.createOption(productId, data)
    }

    @Put(':productId/updateOption/:optionId')
    @Auth()
    updateOption(
        @Param('productId') productId: string,
        @Param('optionId') optionId: string,
        @Body() data: UpdateOptionDto
    ) {
        return this.productService.updateOption(productId, optionId, data)
    }

    @Delete(':productId/removeOption/:optionId')
    @Auth()
    removeOption(
        @Param('optionId') optionId: string,
    ) {
        return this.productService.removeOption(optionId)
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