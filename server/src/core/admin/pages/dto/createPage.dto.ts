import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePageDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    handle: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    metaTitle: string;

    @IsOptional()
    @IsString()
    metaDescription: string;
}