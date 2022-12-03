import { CustomerRole } from "@prisma/client";

export interface IUser {
    id: string;
    role: CustomerRole;
    iat: number;
    exp: number;
}