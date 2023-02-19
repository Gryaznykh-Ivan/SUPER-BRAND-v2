
import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { ConnectOfferDto } from "./offer.dto";
import { ServiceDto } from "./service.dto";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    mailingCountry: string;

    @IsNotEmpty()
    @IsString()
    mailingCity: string;

    @IsNotEmpty()
    @IsString()
    mailingRegion: string;

    @IsNotEmpty()
    @IsString()
    mailingAddress: string;

    @IsOptional()
    @IsString()
    comment: string;

    @IsOptional()
    @IsString()
    note: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ServiceDto)
    services: ServiceDto[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConnectOfferDto)
    offers: ConnectOfferDto[]
}