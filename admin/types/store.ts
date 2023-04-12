import { IOfferSearch, IOrderProduct, IService } from "./api"

export enum Right {
    ORDER_READ = "ORDER_READ",
    ORDER_UPDATE = "ORDER_UPDATE",
    PRODUCT_READ = "PRODUCT_READ",
    PRODUCT_UPDATE = "PRODUCT_UPDATE",
    OFFER_READ = "OFFER_READ",
    OFFER_UPDATE = "OFFER_UPDATE",
    COLLECTION_READ = "COLLECTION_READ",
    COLLECTION_UPDATE = "COLLECTION_UPDATE",
    USER_READ = "USER_READ",
    USER_UPDATE = "USER_UPDATE",
    SHIPPING_READ = "SHIPPING_READ",
    SHIPPING_UPDATE = "SHIPPING_UPDATE",
    PAGE_READ = "PAGE_READ",
    PAGE_UPDATE = "PAGE_UPDATE",
    MEDIA_UPLOAD = "MEDIA_UPLOAD",
    MEDIA_DELETE = "MEDIA_DELETE"
}

export enum Role {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    GUEST = "GUEST",
    CUSTOMER = "CUSTOMER",
}

export enum OfferStatus {
    OFFERED = "OFFERED",
    ACCEPTED = "ACCEPTED",
    DECLINED = "DECLINED",
    ACTIVE = "ACTIVE",
    SOLD = "SOLD",
    NO_MATCH = "NO_MATCH",
    RETURNING = "RETURNING",
    RETURN_APPROVAL = "RETURN_APPROVAL",
}

export enum PaymentStatus {
    UNPAID = "UNPAID",
    PARTIALLY_PAID = "PARTIALLY_PAID",
    NEED_TO_RETURN = "NEED_TO_RETURN",
    REFUNDED = "REFUNDED",
    PAID = "PAID",
}

export enum OrderStatus {
    FULFILLED = "FULFILLED",
    PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED",
    UNFULFILLED = "UNFULFILLED",
    CANCELED = "CANCELED"
}

export enum FulfillmentStatus {
    SENT = "SENT",
    DELIVERED = "DELIVERED"
}

export enum ReturnStatus {
    RETURNED = "RETURNED",
    RETURN_REQUESTED = "RETURN_REQUESTED",
    RETURN_IN_PROGRESS = "RETURN_IN_PROGRESS",
}

export enum Service {
    SHIPPING = "SHIPPING",
    DISCOUNT_AMOUNT = "DISCOUNT_AMOUNT",
    DISCOUNT_PERCENT = "DISCOUNT_PERCENT",
}

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