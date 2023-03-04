import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Right, Role } from '@prisma/client';
import { Auth } from 'src/decorators/auth.decorator';
import { Token } from 'src/decorators/token.decorator';
import { CreateVariantDto } from './dto/createVariant.dto';
import { SearchVariantDto } from './dto/searchVariant.dto';
import { UpdateImageDto } from './dto/updateImage.dto';
import { UpdateVariantDto } from './dto/updateVariant.dto';
import { VariantService } from './variant.service';

@Controller('variants')
export class VariantController {

    constructor(
        private readonly variantService: VariantService
    ) { }


    @Get('search')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_READ])
    getVariantsBySearch(
        @Query(new ValidationPipe({ transform: true })) data: SearchVariantDto
    ) {
        return this.variantService.getVariantsBySearch(data)
    }



    @Get('getPreview/:variantId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_READ])
    getPreview(
        @Param('variantId') variantId: string
    ) {
        return this.variantService.getPreview(variantId)
    }

    @Get('getAll/:productId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_READ])
    getVariants(
        @Param('productId') productId: string
    ) {
        return this.variantService.getVariants(productId)
    }

    @Get('getOptions/:productId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_READ])
    getOptions(
        @Param('productId') productId: string
    ) {
        return this.variantService.getOptions(productId)
    }

    @Get(':variantId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_READ])
    getVariantById(
        @Param('variantId') variantId: string
    ) {
        return this.variantService.getVariantById(variantId)
    }


    @Post('create')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE])
    createVariant(
        @Body() data: CreateVariantDto
    ) {
        return this.variantService.createVariant(data)
    }

    @Post(':variantId/uploadImages')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE, Right.MEDIA_UPLOAD])
    @UseInterceptors(FilesInterceptor('images'))
    uploadImages(
        @Param('variantId') variantId: string,
        @UploadedFiles() images: Express.Multer.File[],
        @Token() token: string
    ) {
        return this.variantService.uploadImages(variantId, images, token)
    }

    @Put(':variantId/updateImage/:imageId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE])
    updateImage(
        @Param('variantId') variantId: string,
        @Param('imageId') imageId: string,
        @Body() data: UpdateImageDto
    ) {
        return this.variantService.updateImage(variantId, imageId, data)
    }

    @Delete(':variantId/removeImage/:imageId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE, Right.MEDIA_DELETE])
    removeImage(
        @Param('variantId') variantId: string,
        @Param('imageId') imageId: string,
    ) {
        return this.variantService.removeImage(variantId, imageId)
    }

    @Put(':variantId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE])
    updateVariant(
        @Param('variantId') variantId: string,
        @Body() data: UpdateVariantDto
    ) {
        return this.variantService.updateVariant(variantId, data)
    }

    @Delete(':variantId')
    @Auth([Role.ADMIN, Role.MANAGER], [Right.PRODUCT_UPDATE])
    removeVariant(
        @Param('variantId') variantId: string,
    ) {
        return this.variantService.removeVariant(variantId)
    }
}