import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";


export class CreateNewOptionDto {
    @IsNotEmpty()
    @IsString()
    title: string;
}

export class CreateOptionDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty({ each: true })
    @ArrayMinSize(1)
    @IsString({ each: true })
    createOptionValues: string[];
}

export class UpdateOptionValueDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    title: string;
}

export class ReorderOptionValueDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsInt()
    position: number;
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
    @ValidateNested()
    @Type(() => ReorderOptionValueDto)
    reorderOptionValue: ReorderOptionValueDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateNewOptionDto)
    createOptionValues: CreateNewOptionDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateOptionValueDto)
    updateOptionValues: UpdateOptionValueDto[]

    @IsOptional()
    @IsString({ each: true })
    deleteOptionValues: string[];
}