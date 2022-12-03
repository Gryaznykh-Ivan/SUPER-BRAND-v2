import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class UserLoginDto {
    @IsEmail()
    readonly login: string;

    @IsString()
    readonly password: string;
}