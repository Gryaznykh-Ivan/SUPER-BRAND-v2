import { ProductStatus } from "@prisma-parser";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsBooleanString, IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Max, Min, ValidateIf } from "class-validator";


export class SearchProductDto {
    @IsOptional()
    @IsString()
    readonly q: string;

    @IsInt()
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10))
    readonly skip: number;

    @IsInt()
    @Max(100)
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10))
    readonly limit: number;

    @IsOptional()
    @IsString()
    @IsEnum(ProductStatus)
    readonly status: ProductStatus;
}