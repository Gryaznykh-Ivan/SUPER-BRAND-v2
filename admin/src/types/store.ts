

export type Role = "ADMIN" | "SELLER" | "MANAGER"

export interface IJwtDecode {
    id: string;
    role: Role;
    iat: number;
    exp: number;
}

export interface IAuthState {
    isAuth: boolean;
    token: string | null;
    payload: IJwtDecode | null;
}