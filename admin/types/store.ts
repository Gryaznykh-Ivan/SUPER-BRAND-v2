import { IJwtDecode } from "./api";

export interface IAuthState {
    isAuth: boolean;
    token: string | null;
    payload: IJwtDecode | null;
}