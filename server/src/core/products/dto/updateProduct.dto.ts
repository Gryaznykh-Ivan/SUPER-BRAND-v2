import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsBoolean()
    readonly available: boolean;

    @IsOptional()
    @IsString()
    readonly description: string;


    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly vendor: string;
}