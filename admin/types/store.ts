import { IOfferSearch, IOrderProduct, IService } from "./api"

export type Right =
    "ORDER_READ" | "ORDER_UPDATE" |
    "PRODUCT_READ" | "PRODUCT_UPDATE" |
    "OFFER_READ" | "OFFER_UPDATE" |
    "COLLECTION_READ" | "COLLECTION_UPDATE" |
    "USER_READ" | "USER_UPDATE" |
    "SHIPPING_READ" | "SHIPPING_UPDATE" |
    "MEDIA_UPLOAD" | "MEDIA_DELETE"


export type Role = "ADMIN" | "MANAGER" | "GUEST" | "CUSTOMER"
export type OfferStatus = "OFFERED" | "ACCEPTED" | "DECLINED" | "ACTIVE" | "SOLD" | "NO_MATCH" | "RETURNING" | "RETURN_APPROVAL"
export type PaymentStatus = "UNPAID" | "PARTIALLY_PAID" | "NEED_TO_RETURN" | "REFUNDED" | "PAID"
export type OrderStatus = "FULFILLED" | "PARTIALLY_FULFILLED" | "UNFULFILLED" | "CANCELED"
export type FulfillmentStatus = "SENT" | "DELIVERED"
export type ReturnStatus = "RETURNED" | "RETURN_REQUESTED" | "RETURN_IN_PROGRESS"
export type Service = "SHIPPING" | "DISCOUNT"

export interface IJwtDecode {
    id: string;
    role: Role;
    name: string;
    permissions: Right[]
    iat: number;
    exp: number;
}

export interface IAuthState {
    isAuth: boolean;
    token: string | null;
    payload: IJwtDecode | null;
}

export interface IConfirmState {
    show: boolean;
    title: string;
    message: string;
}

export interface IOrderState {
    offers: IOrderProduct[];
    services: IService[];
}