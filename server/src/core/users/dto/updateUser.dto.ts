import { Right, Role } from "@prisma/client";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
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
}
