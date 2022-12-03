import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class SendCodeDto {
    @IsEmail()
    readonly login: string;
}