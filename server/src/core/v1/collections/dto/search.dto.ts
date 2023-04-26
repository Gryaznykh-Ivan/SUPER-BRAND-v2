import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";


export class SearchDto {
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