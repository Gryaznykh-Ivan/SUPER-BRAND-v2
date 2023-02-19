import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDecimal, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class ServiceDto {
    @IsNotEmpty()
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    descrption: string;

    @IsDecimal()
    price: number;
}