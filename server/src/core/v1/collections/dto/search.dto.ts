import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export enum CollectionSortEnum {
    popular = 'popular',
    new = 'new',
    old = 'old',
    priceAsc = 'priceAsc',
    priceDesc = 'priceDesc',
    relevance = 'relevance',
}

export class SearchDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10))
    readonly skip: number = 0;

    @IsOptional()
    @IsInt()
    @Max(20)
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10))
    readonly limit: number = 20;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    readonly maxPrice: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    readonly minPrice: number;

    @IsOptional()
    @IsString({ each: true })
    @MinLength(1, { each: true })
    @Transform(({ value }) => value.split(","))
    readonly sizes: string[];

    @IsOptional()
    @IsString({ each: true })
    @MinLength(1, { each: true })
    @Transform(({ value }) => value.split(","))
    readonly brands: string[];

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === "true" ? true : false)
    readonly salesOnly: boolean;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === "true" ? true : false)
    readonly expressDelivery: boolean;

    @IsOptional()
    @IsEnum(CollectionSortEnum, { each: true })
    readonly sort: CollectionSortEnum;
}