import { IsString } from "class-validator";

export class DeleteFileDto {

    @IsString()
    readonly path: string;
}