import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class LogoutDto {
    @IsString()
    @IsUUID()
    readonly refresh_token: string;
}