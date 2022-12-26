import { Role } from "@prisma/client";

export interface IUser {
    id: string;
    role: Role;
    iat: number;
    exp: number;
}