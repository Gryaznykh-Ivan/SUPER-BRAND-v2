
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    title: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    location: string;
}