import { Service } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";

export class ServiceDto {
    @IsEnum(Service)
    type: Service;

    @IsOptional()
    @IsString()
    descrption: string;

    @IsDecimal()
    amount: number;
}

export class DeleteServices {
    @IsNotEmpty()
    @IsString()
    id: string;
}