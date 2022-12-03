import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Access } from 'src/decorators/access.decorator';
import { MulterOptions } from '../../config/multer.config';
import { AddVariantDto } from './dto/addVariant.dto';
import { CreateProductnDto } from './dto/createProduct.dto';
import { UpdateImageDto } from './dto/updateImage.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { UpdateVariantDto } from './dto/updateVariant.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) { }

    @Get(':handle')
    getProductById(
        @Param('handle') id: string
    ) {
        return this.productService.getProductById(id)
    }

    @Get('search')
    getProductsBySearch(
        @Query('q') q: string
    ) {
        return this.productService.getProductsBySearch(q)
    }

    @Post('create')
    @Access('PRIVATE', ['ADMIN'])
    createProduct(
        @Body() createProductDto: CreateProductnDto
    ) {
        return this.productService.createProduct(createProductDto)
    }

    @Post(':id/uploadImages')
    @Access('PRIVATE', ['ADMIN'])
    @UseInterceptors(FilesInterceptor('images', 5, MulterOptions))
    uploadImages(
        @Param('id') id: string,
        @UploadedFiles() images: Express.Multer.File[],
    ) {
        return this.productService.uploadImages(id, images)
    }

    @Put(':id/updateImage/:imageId')
    @Access('PRIVATE', ['ADMIN'])
    updateImage(
        @Param('imageId') imageId: string,
        @Body() updateProductImageDto: UpdateImageDto
    ) {
        return this.productService.updateImage(imageId, updateProductImageDto)
    }

    @Delete(':id/removeImage/:imageId')
    @Access('PRIVATE', ['ADMIN'])
    removeImage(
        @Param('imageId') imageId: string,
    ) {
        return this.productService.removeImage(imageId)
    }

    @Post(':id/addVariant')
    @Access('PRIVATE', ['ADMIN'])
    addVariant(
        @Param('id') id: string,
        @Body() addVariantDto: AddVariantDto
    ) {
        return this.productService.addVariant(id, addVariantDto)
    }

    @Put(':id/updateVariant/:variantId')
    @Access('PRIVATE', ['ADMIN'])
    updateVariant(
        @Param('variantId') variantId: string,
        @Body() updateVariantDto: UpdateVariantDto
    ) {
        return this.productService.updateVariant(variantId, updateVariantDto)
    }

    @Delete(':id/removeVariant/:variantId')
    @Access('PRIVATE', ['ADMIN'])
    removeVariant(
        @Param('variantId') variantId: string
    ) {
        return this.productService.removeVariant(variantId)
    }

    @Put(':id/update')
    @Access('PRIVATE', ['ADMIN'])
    updateProduct(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productService.updateProduct(id, updateProductDto)
    }

    @Delete(':id/remove')
    @Access('PRIVATE', ['ADMIN'])
    removeProduct(
        @Param('id') id: string,
    ) {
        return this.productService.removeProduct(id)
    }
}