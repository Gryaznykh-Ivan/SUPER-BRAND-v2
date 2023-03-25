import { OfferStatus } from "@prisma-shop";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsBooleanString, IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Max, Min, ValidateIf } from "class-validator";


export class SearchOfferDto {
    @IsOptional()
    @IsString()
    q: string;

    @IsInt()
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10))
    readonly skip: number;

    @IsInt()
    @Max(20)
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10))
    readonly limit: number;

    @IsOptional()
    @IsEnum(OfferStatus, { each: true })
    status: OfferStatus;

    @IsOptional()
    @IsEnum(OfferStatus, { each: true })
    notStatus: OfferStatus;

    @IsOptional()
    @IsString()
    deliveryProfileId: string;

    @IsOptional()
    @IsString()
    notDeliveryProfileId: string;

    @IsOptional()
    @IsString()
    variantId: string;

    @IsOptional()
    @IsString()
    userId: string;
}