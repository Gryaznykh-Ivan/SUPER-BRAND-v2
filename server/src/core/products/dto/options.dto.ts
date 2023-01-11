import { Optional } from "@nestjs/common";
import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class CreateOptionDto {
    @IsNotEmpty()
    @IsString()
    title: string;
}

export class UpdateOptionDto {
    @Optional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Optional()
    @IsInt()
    position: number;
}