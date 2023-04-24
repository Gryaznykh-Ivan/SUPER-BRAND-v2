export interface IResponse<T> {
    success: boolean;
    data: T
}

export interface IErrorResponse {
    message: string;
    statusCode: number;
}

export interface IProduct {
    id: string;
    title: string;
    type: string;
    vendor: string;
    price: string;
    compareAtPrice?: string;
}

export interface IImage {
    id: string;
    src: string;
    alt: string;
}

export interface IPage {
    id: string;
    title: string;
    content: string;
    handle: string;
    metaTitle: string;
    metaDescription: string;
    createdAt: Date;
}





//authService
export type LoginResponse = IResponse<string>
export type LoginRequest = {
    login: string;
    code: string;
}

export type SendCodeResponse = IResponse<void>
export type SendCodeRequest = {
    login: string
}

export type RefreshResponse = IResponse<string>
export type RefreshRequest = void


export type LogoutResponse = IResponse<void>
export type LogoutRequest = void




//pageService
export type PageGetByHandleResponse = IResponse<IPage>
export type PageGetByHandleRequest = {
    handle: string
}
