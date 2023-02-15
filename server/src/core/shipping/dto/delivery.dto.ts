import { Type } from "class-transformer";
import { IsArray, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString, Min, NotEquals, ValidateIf, ValidateNested } from "class-validator";


export class CreateDeliveryOptionDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsInt()
    @Min(0)
    duration: string;

    @IsDecimal()
    price: number;
}

export class UpdateDeliveryOptionDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    title: string;

    @IsInt()
    @Min(0)
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    duration: number;

    @IsDecimal()
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    price: number;
}



export class CreateDeliveryZoneDto {
    @IsNotEmpty()
    @IsString()
    region: string;

    @IsNotEmpty()
    @IsString()
    country: string;
}


export class UpdateDeliveryZoneDto {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateDeliveryOptionDto)
    createDeliveryOptions: CreateDeliveryOptionDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateDeliveryOptionDto)
    updateDeliveryOptions: UpdateDeliveryOptionDto[]

    @IsOptional()
    @IsString({ each: true })
    deleteDeliveryOptions: string[];
}