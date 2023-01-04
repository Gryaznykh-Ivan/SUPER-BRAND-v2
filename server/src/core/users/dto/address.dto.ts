import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    region: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    address: string;
}

export class UpdateAddressDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    region: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    address: string;
}