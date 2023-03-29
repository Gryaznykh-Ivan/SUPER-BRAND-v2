import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, NotEquals, ValidateIf, ValidateNested } from "class-validator";
import { ConnectOfferDto, DisconnectOfferDto } from "./offers.dto";

export class UpdateProfileDto {
    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    title: string;

    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    location: string;

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