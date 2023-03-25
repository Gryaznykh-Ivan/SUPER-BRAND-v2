import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Min, NotEquals, ValidateIf, ValidateNested } from "class-validator";


export class UpdateSettingDto {
    @IsString()
    proxy: string;

    @IsDecimal()
    rate: number;

    @IsString()
    upTo135: string;

    @IsString()
    upTo200: string;

    @IsString()
    upTo266: string;
    
    @IsString()
    upTo333: string;

    @IsString()
    upTo400: string;

    @IsString()
    upTo466: string;

    @IsString()
    upTo533: string;

    @IsString()
    upTo600: string;

    @IsString()
    upTo666: string;

    @IsString()
    over666: string;
}