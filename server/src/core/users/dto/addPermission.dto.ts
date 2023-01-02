import { Right } from "@prisma/client";
import { IsEnum } from "class-validator";

export class AddPermissionDto {
    @IsEnum(Right, { each: true })
    right: Right;
}