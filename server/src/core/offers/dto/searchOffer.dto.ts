import { OfferStatus } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsBooleanString, IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Max, Min, ValidateIf } from "class-validator";
import { ParseBooleanPipe } from "src/pipes/parse-boolean.pipe";


export class SearchOfferDto {
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


    @IsOptional()
    @IsEnum(OfferStatus, { each: true })
    status: OfferStatus;
}