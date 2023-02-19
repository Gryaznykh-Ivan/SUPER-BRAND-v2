
import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, NotEquals, ValidateIf, ValidateNested } from "class-validator";
import { ConnectOfferDto, DisconnectOfferDto } from "./offer.dto";
import { ServiceDto } from "./service.dto";

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
    @IsString({ each: true })
    deleteServices: string[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConnectOfferDto)
    connectOffers: ConnectOfferDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DisconnectOfferDto)
    disconnectOffers: DisconnectOfferDto[]
}