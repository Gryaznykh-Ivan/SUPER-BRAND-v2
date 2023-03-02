import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, NotEquals, ValidateIf, ValidateNested } from "class-validator";


export class SettingDto {
    @IsNotEmpty()
    @IsString()
    setting: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    value: string;
}

export class UpdateSettingDto {
    @ArrayMinSize(1)
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SettingDto)
    updateSettings: SettingDto[];
}