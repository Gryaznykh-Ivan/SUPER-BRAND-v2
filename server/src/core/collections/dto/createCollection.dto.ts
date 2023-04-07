import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, NotEquals, ValidateIf, ValidateNested } from "class-validator";
import { ConnectProductDto } from "./products.dto";

export class CreateCollectionDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    handle: string;

    @IsBoolean()
    @NotEquals(null)
    @ValidateIf((_, value) => value !== undefined)
    @Type(() => Boolean)
    hidden: boolean;

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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConnectProductDto)
    connectProducts: ConnectProductDto[]
}