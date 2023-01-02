import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddVariantDto } from './dto/addVariant.dto';
import { CreateProductnDto } from './dto/createProduct.dto';
import { UpdateImageDto } from './dto/updateImage.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { UpdateVariantDto } from './dto/updateVariant.dto';

@Injectable()
export class ProductService {

    constructor(
        private prisma: PrismaService

    ) { }

    async getProductById(handle: string) {
        return handle
    }

    async getProductsBySearch(q: string) {
        return q
    }

    async createProduct(data: CreateProductnDto) {
        return 
    }

    async uploadImages(
        id: string,
        images: Express.Multer.File[]
    ) {
        for (const image of images) {

        }

        return true;
    }

    async updateImage(imageId: string, data: UpdateImageDto) {
        return
    }

    async removeImage(imageId: string) {
        return
    }

    async addVariant(id: string, data: AddVariantDto) { 
        return
    }

    async updateVariant(variantId: string, data: UpdateVariantDto) {
        return
    }

    async removeVariant(variantId: string) {
        return
    }

    async updateProduct(id: string, data: UpdateProductDto) {
        return
    }

    async removeProduct(id: string) {
        return
    }
}