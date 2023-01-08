import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from "class-validator";
import { ConnectCollectionDto } from "./collections.dto";
import { ConnectImagesDto } from "./images.dto";

export class CreateProductnDto {

    @IsString()
    title: string;
    
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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConnectCollectionDto)
    connectCollections: ConnectCollectionDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConnectImagesDto)
    connectImages: ConnectImagesDto[]
}