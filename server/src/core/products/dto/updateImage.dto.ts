import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateImageDto {
    @IsOptional()
    @IsString()
    src: string;

    @IsOptional()
    @IsString()
    alt: string;

    @IsOptional()
    @IsNumber()
    position: number;
}