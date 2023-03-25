
export type Right =
"ORDER_CREATE" | "ORDER_READ" | "ORDER_UPDATE" | "ORDER_DELETE" |
"PRODUCT_CREATE" | "PRODUCT_READ" | "PRODUCT_UPDATE" | "PRODUCT_DELETE" |
"OFFER_CREATE" | "OFFER_READ" | "OFFER_UPDATE" | "OFFER_DELETE" |
"COLLECTION_CREATE" | "COLLECTION_READ" | "COLLECTION_UPDATE" | "COLLECTION_DELETE" |
"USER_CREATE" | "USER_READ" | "USER_UPDATE" | "USER_DELETE" |
"SHIPPING_CREATE" | "SHIPPING_READ" | "SHIPPING_UPDATE" | "SHIPPING_DELETE" |
"MEDIA_UPLOAD" | "MEDIA_DELETE"


export type Role = "ADMIN" | "MANAGER" | "GUEST" | "CUSTOMER"

export type ProductStatus = "DONE" | "ERROR" | "WAITING_STOCKX_DATA" | "WAITING_SHOP_UPDATE"

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