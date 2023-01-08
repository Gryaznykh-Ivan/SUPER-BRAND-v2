import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";


export class ConnectImagesDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}

export class DisconnectImagesDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}