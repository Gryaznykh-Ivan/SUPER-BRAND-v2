import { Transform } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, ValidateIf } from "class-validator";



export class SearchDto {
    @IsOptional()
    @IsString()
    q: string;

    @IsInt()
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10))
    readonly skip: number;

    @IsInt()
    @Max(20)
    @Min(0)
    @Transform(({ value }) => parseInt(value, 10))
    readonly limit: number;
}