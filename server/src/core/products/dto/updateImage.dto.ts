import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateImageDto {
    @IsString()
    readonly src: string;

    @IsString()
    readonly alt: string;

    @IsNumber()
    readonly position: number;
}