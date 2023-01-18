import { OfferStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, NotEquals, ValidateIf, ValidateNested } from "class-validator";

export class UpdateOfferDto {
    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    variantId: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    price: number;

    @IsOptional()
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