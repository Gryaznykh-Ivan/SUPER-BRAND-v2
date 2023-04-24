import { Transform, TransformFnParams, Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, NotEquals, ValidateIf, ValidateNested } from "class-validator";
import { ConnectCollectionDto } from "./collections.dto";
import { CreateTagDto, DeleteTagDto } from "./tag.dto";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    title: string;

    @IsOptional()
    @IsString()
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

    @IsBoolean()
    defaultSnippet: boolean;

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
    @Type(() => CreateTagDto)
    createTags: CreateTagDto[]
}