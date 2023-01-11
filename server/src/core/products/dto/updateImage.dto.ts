import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateImageDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    src: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    alt: string;

    @IsOptional()
    @IsInt()
    position: number;
}