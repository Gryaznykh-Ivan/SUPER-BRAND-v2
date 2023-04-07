
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
    MEDIA_UPLOAD = "MEDIA_UPLOAD",
    MEDIA_DELETE = "MEDIA_DELETE"
}


export enum Role {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    GUEST = "GUEST",
    CUSTOMER = "CUSTOMER",
}

export enum ProductStatus {
    DONE = "DONE",
    ERROR = "ERROR",
    WAITING_STOCKX_DATA = "WAITING_STOCKX_DATA",
    WAITING_SHOP_UPDATE = "WAITING_SHOP_UPDATE",
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