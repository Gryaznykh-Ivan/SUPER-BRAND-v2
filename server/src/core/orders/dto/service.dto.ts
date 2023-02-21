import { Service } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDecimal, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class ServiceDto {
    @IsEnum(Service)
    type: Service;

    @IsOptional()
    @IsString()
    descrption: string;

    @IsDecimal()
    price: number;
}

export class DeleteServices {
    @IsNotEmpty()
    @IsString()
    id: string;
}