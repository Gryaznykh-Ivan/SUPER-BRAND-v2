import { ProductStatus } from "@prisma-parser";
import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsBooleanString, IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Max, Min, ValidateIf } from "class-validator";


export class UpdateProductsDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    ids: string[];
}