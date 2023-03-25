import { ProductStatus } from "./store";

export interface IResponse<T> {
    success: boolean;
    data: T
}

export interface IErrorResponse {
    message: string;
    statusCode: number;
}

export interface ISetting {
    rate: string;
    proxy: string;
    upTo135: string;
    upTo200: string;
    upTo266: string;
    upTo333: string;
    upTo400: string;
    upTo466: string;
    upTo533: string;
    upTo600: string;
    upTo666: string;
    over666: string;
}

export interface BotState {
    id: string;
    action: string;
    status: string;
}

export interface IProduct {
    id: string;
    title: string;
    pfactor: string;
    status: ProductStatus;
    stockx: string;
    updatedAt: string;
}



// AuthService

export type RefreshResponse = IResponse<string>
export type RefreshRequest = void

export type LogoutResponse = IResponse<void>
export type LogoutRequest = void




// SettingsService

export type SettingGetByIdResponse = IResponse<ISetting>
export type SettingGetByIdRequest = {
    settingId: string;
}

export type SettingUpdateResponse = IResponse<void>
export type SettingUpdateRequest = { settingId: string } & Partial<ISetting>




// botService

export type BotGetByIdResponse = IResponse<BotState>
export type BotGetByIdRequest = {
    botId: string;
}

export type BotStartResponse = IResponse<void>
export type BotStartRequest = void;

export type BotAddProductToParseResponse = IResponse<void>
export type BotAddProductToParseRequest = FormData;





// productService

export type ProductGetBySearchResponse = IResponse<IProduct[]>
export type ProductGetBySearchRequest = {
    status: string;
    limit: number;
    skip: number;
}