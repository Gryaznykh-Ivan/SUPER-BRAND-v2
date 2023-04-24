import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";


export class ConnectOfferDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}

export class DisconnectOfferDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}