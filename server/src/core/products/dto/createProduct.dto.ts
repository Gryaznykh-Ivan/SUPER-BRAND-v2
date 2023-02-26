import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { ConnectCollectionDto } from "./collections.dto";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    handle: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    metaTitle: string;

    @IsOptional()
    @IsString()
    metaDescription: string;

    @IsOptional()
    @IsBoolean()
    available: boolean;

    @IsOptional()
    @IsString()
    vendor: string;

    @IsOptional()
    @IsString()
    barcode: string;

    @IsOptional()
    @IsString()
    SKU: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConnectCollectionDto)
    connectCollections: ConnectCollectionDto[]
}