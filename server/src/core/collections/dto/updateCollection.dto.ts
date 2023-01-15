import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, NotEquals, ValidateIf, ValidateNested } from "class-validator";
import { ConnectProductDto, DisconnectProductDto } from "./products.dto";

export class UpdateCollectionDto {
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
    
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DisconnectProductDto)
    disconnectProducts: DisconnectProductDto[]
}