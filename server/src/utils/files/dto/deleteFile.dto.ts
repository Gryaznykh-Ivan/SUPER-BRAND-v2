import { IsString } from "class-validator";

export class DeleteFileDto {
    @IsString({ each: true })
    paths: string[];
}