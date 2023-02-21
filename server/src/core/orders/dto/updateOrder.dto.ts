
import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, NotEquals, ValidateIf, ValidateNested } from "class-validator";
import { ConnectOfferDto, DisconnectOfferDto } from "./offer.dto";
import { DeleteServices, ServiceDto } from "./service.dto";

export class UpdateOrderDto {
    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    userId: string;

    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    mailingCountry: string;

    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    mailingCity: string;

    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    mailingRegion: string;

    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    mailingAddress: string;

    @IsOptional()
    @IsString()
    note: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ServiceDto)
    createServices: ServiceDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConnectOfferDto)
    createOffers: ConnectOfferDto[]


    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DeleteServices)
    deleteServices: DeleteServices[]


    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DisconnectOfferDto)
    deleteOffers: DisconnectOfferDto[]
}