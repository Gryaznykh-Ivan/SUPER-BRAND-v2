import { Right, Role } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { AddAddressDto } from "./addAddress.dto";

export class CreateUserDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    inn: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    account: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    correspondentAccount: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    bic: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    passport: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @IsOptional()
    @IsBoolean()
    isVerified: boolean;

    @IsOptional()
    @IsBoolean()
    isSubscribed: boolean;

    @IsOptional()
    @IsEnum(Right, { each: true })
    permissions: Right[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddAddressDto)
    addresses: AddAddressDto[]
}
