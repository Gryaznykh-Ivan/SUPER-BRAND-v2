import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";


export class ConnectCollectionDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}

export class DisconnectCollectionDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}