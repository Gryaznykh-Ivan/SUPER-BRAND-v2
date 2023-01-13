import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";


export class CreateOptionDto {
    @IsNotEmpty()
    @IsString()
    title: string;
}

export class UpdateOptionValueDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    title: string;
}

export class UpdateOptionDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsInt()
    position: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOptionDto)
    createOptionValues: CreateOptionDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateOptionValueDto)
    updateOptionValues: UpdateOptionValueDto[]

    @IsOptional()
    @IsString({ each: true })
    deleteOptionValues: string[];
}