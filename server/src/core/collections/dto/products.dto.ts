import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";


export class ConnectProductDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}

export class DisconnectProductDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}