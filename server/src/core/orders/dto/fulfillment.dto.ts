import { FulfillmentStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { ConnectOfferDto } from "./offer.dto";


export class CreateFulfillmentDto {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ConnectOfferDto)
    offers: ConnectOfferDto[]
}

export class UpdateFulfillmentDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    tracking: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    carrier: string;

    @IsOptional()
    @IsEnum(FulfillmentStatus, { each: true })
    status: FulfillmentStatus;
}