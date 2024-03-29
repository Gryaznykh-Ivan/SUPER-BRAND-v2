export interface IResponse<T> {
    success: boolean;
    data: T
}

export interface IErrorResponse {
    message: string;
    statusCode: number;
}

export interface IProductCard {
    handle: string
    title: string;
    type: string;
    vendor: string;
    image: IImage | null;
    price: string | null;
    compareAtPrice: string | null;
}

export interface IImage {
    id: string;
    src: string;
    alt: string;
    blurhash: string;
}

export interface IPage {
    id: string;
    title: string;
    type: string;
    content: string;
    handle: string;
    metaTitle: string;
    metaDescription: string;
    createdAt: Date;
}

export interface ICollection {
    handle: string;
    title: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    hidden: boolean;
}

export interface ICollectionPage {
    products: IProductCard[];
    currentPage: number;
    totalPages: number;
}

export interface ICollectionFilters {
    prices: {
        min: number;
        max: number;
    };
    sizes: {
        title: string;
        values: string[];
    }[];
    brands: string[];
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



//collectionService
export type CollectionGetByHandleResponse = IResponse<ICollection>
export type CollectionGetByHandleRequest = {
    handle: string;
}

export type CollectionGetProductsByHandleResponse = IResponse<ICollectionPage>
export type CollectionGetProductsByHandleRequest = {
    handle: string;
    skip: number;
    limit: number;
    sort?: string;
    sizes?: string;
    brands?: string;
    maxPrice?: string;
    minPrice?: string;
    salesOnly?: string;
    expressDelivery?: string;
}

export type CollectionGetProductsRecommendationByHandleResponse = IResponse<IProductCard[]>
export type CollectionGetProductsRecommendationByHandleRequest = {
    handle: string;
    limit: number;
}

export type CollectionGetFiltersByHandleResponse = IResponse<ICollectionFilters>
export type CollectionGetFiltersByHandleRequest = {
    handle: string;
    sort?: string;
    sizes?: string;
    brands?: string;
    maxPrice?: string;
    minPrice?: string;
    salesOnly?: string;
    expressDelivery?: string;
}
