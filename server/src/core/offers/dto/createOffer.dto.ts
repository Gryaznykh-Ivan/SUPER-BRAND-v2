import { OfferStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class CreateOfferDto {
    @IsNotEmpty()
    @IsString()
    variantId: string;

    @IsDecimal()
    price: number;

    @IsDecimal()
    offerPrice: number;

    @IsOptional()
    @IsDecimal()
    compareAtPrice: number;

    @IsOptional()
    @IsString()
    comment: string;

    @IsOptional()
    @IsEnum(OfferStatus, { each: true })
    status: OfferStatus;

    @IsOptional()
    @IsString()
    deliveryProfileId: string;

    @IsOptional()
    @IsString()
    userId: string;
}