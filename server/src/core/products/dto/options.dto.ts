import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateOptionDto {
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
}