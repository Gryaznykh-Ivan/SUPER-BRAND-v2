export interface IResponse<T> {
    success: boolean;
    data: T
}

export interface IErrorResponse {
    message: string;
    statusCode: number;
}

export interface IUserSearch {
    id: string;
    fullName: string | null;
    phone: string | null;
    email: string | null;
    comment: string | null;
    location: string | null;
    offersCount: number;
    ordersCount: number;
    createdAt: Date;
}

export interface IUserAddress {
    id: string;
    country: string;
    region: string;
    city: string;
    address: string;
}

export interface IUserPermission {
    id: string;
    right: string;
}

export interface IUser {
    id: string;
    email: string | null;
    phone: string | null;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    inn: string | null;
    account: string | null;
    correspondentAccount: string | null;
    bic: string | null;
    passport: string | null;
    comment: string | null;
    isVerified: boolean;
    isSubscribed: boolean;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    addresses: IUserAddress[];
    permissions: IUserPermission[];
}






// AuthService

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





// userService

export type UserSearchResponse = IResponse<IUserSearch[]>
export type UserSearchRequest = {
    q?: string;
    limit?: number;
    skip?: number;
}

export type UserGetByIdResponse = IResponse<IUser>
export type UserGetByIdRequest = {
    userId: string
}

export type UserCreateResponse = IResponse<void>
export type UserCreateRequest = {
    email?: string;
    phone?: string;
    lastName?: string;
    fullName?: string;
    inn?: string;
    account?: string;
    correspondentAccount?: string;
    bic?: string;
    passport?: string;
    comment?: string;
    isVerified?: boolean;
    isSubscribed?: boolean;
    role?: string;
    addresses?: (Omit<IUserAddress, "id">)[];
    permissions?: (Omit<IUserPermission, "id">)[];
}

export type UserUpdateResponse = IResponse<void>
export type UserUpdateRequest = {
    userId: string;
    email?: string;
    phone?: string;
    lastName?: string;
    fullName?: string;
    inn?: string;
    account?: string;
    correspondentAccount?: string;
    bic?: string;
    passport?: string;
    comment?: string;
    isVerified?: boolean;
    isSubscribed?: boolean;
    role?: string;
}

export type UserAddAddressResponse = IResponse<void>
export type UserAddAddressRequest = {
    userId: string;
    data: Omit<IUserAddress, "id">
}

export type UserRemoveAddressResponse = IResponse<void>
export type UserRemoveAddressRequest = {
    userId: string;
    addressId: string;
}

export type UserAddPermissionResponse = IResponse<void>
export type UserAddPermissionRequest = {
    userId: string;
    data: Omit<IUserPermission, "id">
}

export type UserRemovePermissionResponse = IResponse<void>
export type UserRemovePermissionRequest = {
    userId: string;
    permissionId: string;
}

export type UserDeleteResponse = IResponse<void>
export type UserDeleteRequest = {
    userId: string;
}
