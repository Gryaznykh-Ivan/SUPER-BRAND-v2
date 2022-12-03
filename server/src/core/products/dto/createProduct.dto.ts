import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateProductnDto {
    @IsOptional()
    @IsBoolean()
    readonly available: boolean;

    @IsString()
    readonly description: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly vendor: string;
}