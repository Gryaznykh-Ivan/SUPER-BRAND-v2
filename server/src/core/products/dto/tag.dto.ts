import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";


export class CreateTagDto {
    @IsNotEmpty()
    @IsString()
    title: string;
}

export class DeleteTagDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}