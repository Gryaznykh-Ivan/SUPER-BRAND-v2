import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, NotEquals, ValidateIf, ValidateNested } from "class-validator";

export class UpdateVariantDto {
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