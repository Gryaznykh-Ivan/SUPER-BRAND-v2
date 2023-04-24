import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, NotEquals, ValidateIf, ValidateNested } from "class-validator";

export class CreateVariantDto {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    option0: string;

    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    option1: string;

    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    option2: string;

    @IsOptional()
    @IsString()
    SKU: string;

    @IsOptional()
    @IsString()
    barcode: string;
}