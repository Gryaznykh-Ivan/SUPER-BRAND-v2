import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class CustomerLoginDto {
    @IsEmail()
    readonly login: string;

    @IsString()
    readonly code: string;

    @IsOptional()
    @IsUUID()
    readonly guestId: string;
}