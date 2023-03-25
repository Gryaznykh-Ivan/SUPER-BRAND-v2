import { OfferStatus } from "@prisma-shop";
import { Type } from "class-transformer";
import { IsArray, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, NotEquals, ValidateIf, ValidateNested } from "class-validator";

export class UpdateOfferDto {
    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    variantId: string;

    @IsOptional()
    @IsDecimal()
    price: number;

    @IsOptional()
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

    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    deliveryProfileId: string;

    @IsOptional()
    @IsString()
    userId: string;
}