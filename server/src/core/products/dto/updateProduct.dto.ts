import { Transform, TransformFnParams, Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, NotEquals, ValidateIf, ValidateNested } from "class-validator";
import { ConnectCollectionDto, DisconnectCollectionDto } from "./collections.dto";
import { CreateMetafieldDto, DeleteMetafieldDto, UpdateMetafieldDto } from "./metafields.dto";

export class UpdateProductDto {
    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    title: string;

    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    handle: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    metaTitle: string;

    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    metaDescription: string;

    @IsOptional()
    @IsBoolean()
    available: boolean;

    @IsOptional()
    @IsString()
    vendor: string;

    @IsOptional()
    @IsString()
    type: string;

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

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DisconnectCollectionDto)
    disconnectCollections: DisconnectCollectionDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMetafieldDto)
    createMetafields: CreateMetafieldDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateMetafieldDto)
    updateMetafields: UpdateMetafieldDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DeleteMetafieldDto)
    deleteMetafields: DeleteMetafieldDto[]
}