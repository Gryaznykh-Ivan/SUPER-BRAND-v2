import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class RefreshDto {
    @IsString()
    @IsUUID()
    readonly refresh_token: string;
}