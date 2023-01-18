import { OfferStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class CreateOfferDto {
    @IsNotEmpty()
    @IsString()
    variantId: string;

    @IsInt()
    @Min(0)
    price: number;

    @IsInt()
    @Min(0)
    offersPrice: number;

    @IsOptional()
    @IsInt()
    @Min(0)
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
    providerId: string;
}