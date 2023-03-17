import { FulfillmentStatus, OfferStatus, OrderStatus, PaymentStatus, ReturnStatus, Right, Role, Service } from "./store";

export interface IResponse<T> {
    success: boolean;
    data: T
}

export interface IErrorResponse {
    message: string;
    statusCode: number;
}

export interface IMetafield {
    id: string;
    key: string;
    value: string;
}

export interface ISetting {
    id: string;
    setting: string;
    title: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IDeliveryOption {
    id: string;
    title: string;
    duration: number;
    price: string;
}

export interface IDeliveryZone {
    id: string;
    country: string;
    region: string;
    options: IDeliveryOption[]
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

export interface IDeliveryProfilePreview {
    id: string;
    title: string;
    zonesCount: number;
    offersCount: number;
}

export interface IDeliveryProfile {
    id: string;
    title: string;
}


export interface IOfferSearch {
    id: string;
    product: string;
    variant: string;
    price: string;
    offerPrice: string | null;
    status: OfferStatus;
    user: string | null;
    image: IImage;
    deliveryProfile: IDeliveryProfile;
}

export interface IUserAddress {
    id: string;
    country: string;
    region: string;
    city: string;
    address: string;
}

export interface IOrderAddress {
    mailingCountry: string;
    mailingCity: string;
    mailingRegion: string;
    mailingAddress: string;
}

export interface IUserPermission {
    id: string;
    right: Right;
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
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    addresses: IUserAddress[];
    permissions: IUserPermission[];
}

export interface IOffer {
    id: string;
    product: string;
    variant: string;
    image: IImage | null;
    variantId: string | null;
    productId: string | null;
    price: string | null;
    compareAtPrice: string | null;
    offerPrice: string | null;
    comment: string | null;
    deliveryProfileId: string | null;
    status: OfferStatus;
    userId: string | null;
    orderId: string | null;
}

export interface IImage {
    id: string;
    alt: string;
    src: string;
    position: number;
}

export interface IProductOption {
    id: string;
    title: string;
    position: number;
    values: {
        id: string;
        title: string;
    }[]
}

export interface IOption {
    id: string;
    title: string;
    position: number;
    option: number;
}

export interface ICollection {
    id: string;
    title: string;
    handle: string;
    description: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    images: IImage[];
}

export interface ICollectionSearch {
    id: string;
    title: string;
    productsCount: number;
    createdAt: Date
}

export interface IVariantSearch {
    id: string;
    image: IImage | null;
    title: string;
    variants: {
        id: string;
        title: string;
    }[];
}

export interface IVariantPreview {
    id: string;
    title: string;
    price: string;
    image: IImage | null;
}

export interface IOfferVariantPreview {
    id: string;
    product: string;
    productId: string;
    variant: string;
    image: IImage | null;
}

export interface IVariant {
    id: string;
    option0: string;
    option1: string;
    option2: string;
    barcode: string;
    SKU: string;
    options: IOption[];
    images: IImage[];
}

export interface IProductSearch {
    id: string;
    image: IImage | null;
    title: string;
    available: boolean;
    vendor: string;
    offersCount: number;
}

export interface ICollectionProduct {
    id: string;
    title: string;
    image: IImage | null;
    available: boolean;
}

export interface IProduct {
    id: string;
    title: string;
    available: boolean;
    handle: string;
    description: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    vendor: string | null;
    SKU: string | null;
    barcode: string | null;
    images: IImage[];
    collections: Pick<ICollection, "id" | "title">[];
    options: IProductOption[];
    metafields: IMetafield[];
}

export interface IOrderSearch {
    id: number;
    createdAt: Date;
    user: string;
    totalPrice: string;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    returnStatus: ReturnStatus | null;
    offersCount: number;
    servicesCount: number;
}

export interface ITimeline {
    id: string;
    title: string;
    message: string;
    user: string;
    createdAt: Date;
}

export interface IOrderProduct {
    id: string;
    product: string;
    variant: string;
    image: IImage | null;
    deliveryProfile: IDeliveryProfile;
    price: string;
}

export interface IReturnProduct {
    id: string;
    product: string;
    variant: string;
    image: IImage | null;
    price: string;
    reason: string;
}

export interface IFulfillment {
    id: string;
    offers: IOrderProduct[];
    status: FulfillmentStatus;
    carrier: string;
    tracking: string;
}

export interface IOrderReturn {
    id: string;
    offers: IReturnProduct[];
    status: ReturnStatus;
    carrier: string;
    tracking: string;
}

export interface IService {
    id: string;
    type: Service;
    description: string | null;
    price: string;
}

export interface IRemovedOffer {
    id: string;
    product: string;
    variant: string;
    image: IImage | null;
    deliveryProfile: IDeliveryProfile;
    price: string;
}

export interface IOrder {
    id: number;
    note: string;
    userId: string;
    mailingAddress: string;
    mailingCity: string;
    mailingCountry: string;
    mailingRegion: string;
    totalPrice: number;
    paymentStatus: PaymentStatus;
    returnStatus: ReturnStatus | null;
    orderStatus: OrderStatus;
    offers: IOrderProduct[];
    returns: IOrderReturn[];
    removedOffers: IRemovedOffer[];
    fulfillments: IFulfillment[];
    services: IService[];
    paid: number;
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

export type UserGetAddressesResponse = IResponse<IUserAddress[]>
export type UserGetAddressesRequest = {
    userId: string
}

export type UserCreateResponse = IResponse<void>
export type UserCreateRequest = {
    email?: string | null;
    phone?: string | null;
    lastName?: string | null;
    fullName?: string | null;
    inn?: string | null;
    account?: string | null;
    correspondentAccount?: string | null;
    bic?: string | null;
    passport?: string | null;
    comment?: string | null;
    role?: string;
    isVerified?: boolean;
    isSubscribed?: boolean;
    createAddresses?: Omit<IUserAddress, "id">[];
    createPermissions?: Right[];
}

export type UserUpdateResponse = IResponse<void>
export type UserUpdateRequest = {
    userId?: string;
    email?: string | null;
    phone?: string | null;
    lastName?: string | null;
    fullName?: string | null;
    inn?: string | null;
    account?: string | null;
    correspondentAccount?: string | null;
    bic?: string | null;
    passport?: string | null;
    comment?: string | null;
    role?: string;
    isVerified?: boolean;
    isSubscribed?: boolean;
    createPermissions?: Right[];
    deletePermissions?: string[];
    createAddresses?: Omit<IUserAddress, "id">[];
    updateAddresses?: IUserAddress[];
    deleteAddresses?: string[];
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




// suggestionService

export type CountriesSuggestionResponse = IResponse<string[]>
export type CountriesSuggestionRequest = {
    q: string;
}

export type RegionsSuggestionResponse = IResponse<string[]>
export type RegionsSuggestionRequest = {
    q: string;
    country?: string;
}

export type CitiesSuggestionResponse = IResponse<string[]>
export type CitiesSuggestionRequest = {
    q: string;
    region?: string;
}

export type CollectionsSuggestionResponse = IResponse<Pick<ICollection, "id" | "title">[]>
export type CollectionsSuggestionRequest = {
    q: string;
    ids?: string[];
}

export type VendorsSuggestionResponse = IResponse<string[]>
export type VendorsSuggestionRequest = {
    q: string;
}

export type DeliveryProfilesSuggestionResponse = IResponse<Pick<IDeliveryProfile, "id" | "title">[]>
export type DeliveryProfilesSuggestionRequest = void;

export type DeliveryOptionsSuggestionResponse = IResponse<IDeliveryOption[]>
export type DeliveryOptionsSuggestionRequest = {
    region: string;
    deliveryProfileId: string;
};

export type deliveryZonesSuggestionResponse = IResponse<Pick<IDeliveryZone, "country" | "region">[]>
export type DeliveryZonesSuggestionRequest = {
    q?: string;
    limit?: number;
    skip?: number;
    profileId?: string;
};



// productService

export type ProductSearchResponse = IResponse<IProductSearch[]>
export type ProductSearchRequest = {
    q?: string;
    limit?: number;
    skip?: number;
    available?: string;
    notInCollectionId?: string;
}

export type ProductGetByIdResponse = IResponse<IProduct>
export type ProductGetByIdRequest = {
    productId: string
}

export type ProductCreateResponse = IResponse<string>
export type ProductCreateRequest = {
    title?: string;
    handle?: string;
    available?: boolean;
    SKU?: string;
    barcode?: string;
    description?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    vendor?: string | null;
    connectCollections?: Pick<ICollection, "id">[];
}

export type ProductUpdateResponse = IResponse<void>
export type ProductUpdateRequest = {
    productId?: string
    title?: string;
    handle?: string;
    available?: boolean;
    description?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    vendor?: string | null;
    connectCollections?: Pick<ICollection, "id">[];
    disconnectCollections?: Pick<ICollection, "id">[];
    createMetafields?: Omit<IMetafield, "id">[];
    updateMetafields?: IMetafield[];
    deleteMetafields?: Pick<IMetafield, "id">[];
}

export type ProductDeleteResponse = IResponse<void>
export type ProductDeleteRequest = {
    productId: string;
}

export type ProductUploadImagesResponse = IResponse<void>
export type ProductUploadImagesRequest = {
    productId: string;
    formData: FormData;
}

export type ProductUpdateImageResponse = IResponse<void>
export type ProductUpdateImageRequest = {
    productId: string;
    imageId: string;
    src?: string;
    alt?: string;
    position?: number;
}

export type ProductRemoveImageResponse = IResponse<void>
export type ProductRemoveImageRequest = {
    productId: string;
    imageId: string;
}

export type ProductCreateOptionResponse = IResponse<void>
export type ProductCreateOptionRequest = {
    productId: string;
    title: string;
    createOptionValues: string[];
}

export type ProductUpdateOptionResponse = IResponse<void>
export type ProductUpdateOptionRequest = {
    productId: string;
    optionId: string;
    title?: string;
    position?: number;
    createOptionValues?: Pick<IProductOption, "title">[];
    updateOptionValues?: Pick<IProductOption, "title" | "id">[];
    deleteOptionValues?: string[];
}

export type ProductRemoveOptionResponse = IResponse<void>
export type ProductRemoveOptionRequest = {
    productId: string;
    optionId: string;
}



// variantService

export type VariantSearchResponse = IResponse<IVariantSearch[]>
export type VariantSearchRequest = {
    q?: string;
    limit?: number;
    skip?: number;
}

export type VariantGetAllResponse = IResponse<IVariantPreview[]>
export type VariantGetAllRequest = {
    productId: string
}

export type VariantGetPreviewResponse = IResponse<IOfferVariantPreview>
export type VariantGetPreviewRequest = {
    variantId: string
}

export type VariantGetOptionsResponse = IResponse<IOption[]>
export type VariantGetOptionsRequest = {
    productId: string
}

export type VariantGetByIdResponse = IResponse<IVariant>
export type VariantGetByIdRequest = {
    variantId: string
}

export type VariantCreateResponse = IResponse<string>
export type VariantCreateRequest = {
    productId?: string;
    option0?: string | null;
    option1?: string | null;
    option2?: string | null;
    barcode?: string | null;
    SKU?: string | null;
}

export type VariantUpdateResponse = IResponse<void>
export type VariantUpdateRequest = {
    variantId?: string;
    option0?: string | null;
    option1?: string | null;
    option2?: string | null;
    barcode?: string | null;
    SKU?: string | null;
}

export type VariantDeleteResponse = IResponse<void>
export type VariantDeleteRequest = {
    variantId: string;
}

export type VariantUploadImagesResponse = IResponse<void>
export type VariantUploadImagesRequest = {
    variantId: string;
    formData: FormData;
}

export type VariantUpdateImageResponse = IResponse<void>
export type VariantUpdateImageRequest = {
    variantId: string;
    imageId: string;
    src?: string;
    alt?: string;
    position?: number;
}

export type VariantRemoveImageResponse = IResponse<void>
export type VariantRemoveImageRequest = {
    variantId: string;
    imageId: string;
}



// collectionService

export type CollectionSearchResponse = IResponse<ICollectionSearch[]>
export type CollectionSearchRequest = {
    q?: string;
    limit?: number;
    skip?: number;
}

export type CollectionGetProductsResponse = IResponse<ICollectionProduct[]>
export type CollectionGetProductsRequest = {
    collectionId: string
    q?: string;
    limit?: number;
    skip?: number;
}

export type CollectionGetByIdResponse = IResponse<ICollection>
export type CollectionGetByIdRequest = {
    collectionId: string
}

export type CollectionCreateResponse = IResponse<string>
export type CollectionCreateRequest = {
    title?: string;
    handle?: string;
    available?: boolean;
    description?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    vendor?: string | null;
    connectProducts?: Pick<IProduct, "id">[];
}

export type CollectionUpdateResponse = IResponse<void>
export type CollectionUpdateRequest = {
    collectionId?: string
    title?: string;
    handle?: string;
    available?: boolean;
    description?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    vendor?: string | null;
    connectProducts?: Pick<IProduct, "id">[];
    disconnectProducts?: Pick<IProduct, "id">[];
}

export type CollectionDeleteResponse = IResponse<void>
export type CollectionDeleteRequest = {
    collectionId: string;
}

export type CollectionUploadImagesResponse = IResponse<void>
export type CollectionUploadImagesRequest = {
    collectionId: string;
    formData: FormData;
}

export type CollectionUpdateImageResponse = IResponse<void>
export type CollectionUpdateImageRequest = {
    collectionId: string;
    imageId: string;
    src?: string;
    alt?: string;
    position?: number;
}

export type CollectionRemoveImageResponse = IResponse<void>
export type CollectionRemoveImageRequest = {
    collectionId: string;
    imageId: string;
}






// offerService

export type OfferSearchResponse = IResponse<IOfferSearch[]>
export type OfferSearchRequest = {
    q?: string;
    limit?: number;
    skip?: number;
    status?: string;
    notStatus?: string;
    deliveryProfileId?: string;
    notDeliveryProfileId?: string;
}

export type OfferGetByIdResponse = IResponse<IOffer>
export type OfferGetByIdRequest = {
    offerId: string
}

export type OfferCreateResponse = IResponse<string>
export type OfferCreateRequest = {
    variantId?: string;
    price?: string | null;
    compareAtPrice?: string | null;
    offerPrice?: string | null;
    comment?: string | null;
    deliveryProfileId?: string;
    status?: string;
    userId?: string | null;
}

export type OfferUpdateResponse = IResponse<void>
export type OfferUpdateRequest = {
    offerId?: string;
    variantId?: string;
    price?: string | null;
    compareAtPrice?: string | null;
    offerPrice?: string | null;
    comment?: string | null;
    deliveryProfileId?: string;
    status?: string;
    userId?: string | null;
}

export type OfferDeleteResponse = IResponse<void>
export type OfferDeleteRequest = {
    offerId: string;
}






// shippingService

export type DeliveryProfileGetAllResponse = IResponse<IDeliveryProfilePreview[]>
export type DeliveryProfileGetAllRequest = void

export type DeliveryProfileGetDeliveryZonesResponse = IResponse<IDeliveryZone[]>
export type DeliveryProfileGetDeliveryZonesRequest = {
    profileId: string;
    q?: string;
    limit?: number;
    skip?: number;
}

export type DeliveryProfileGetByIdResponse = IResponse<IDeliveryProfile>
export type DeliveryProfileGetByIdRequest = {
    profileId: string;
}

export type DeliveryProfileCreateResponse = IResponse<string>
export type DeliveryProfileCreateRequest = {
    title: string;
}

export type DeliveryProfileUpdateResponse = IResponse<void>
export type DeliveryProfileUpdateRequest = {
    profileId?: string;
    connectOffers?: Pick<IOffer, "id">[];
    disconnectOffers?: Pick<IOffer, "id">[];
}

export type DeliveryProfileDeleteResponse = IResponse<void>
export type DeliveryProfileDeleteRequest = {
    profileId: string;
}

export type DeliveryZoneCreateResponse = IResponse<void>
export type DeliveryZoneCreateRequest = {
    profileId: string;
    country?: string;
    region?: string;
}

export type DeliveryZoneUpdateResponse = IResponse<void>
export type DeliveryZoneUpdateRequest = {
    profileId: string;
    zoneId: string;
    createDeliveryOptions?: Omit<IDeliveryOption, "id">[];
    updateDeliveryOptions?: IDeliveryOption[];
    deleteDeliveryOptions?: string[];
}

export type DeliveryZoneDeleteResponse = IResponse<void>
export type DeliveryZoneDeleteRequest = {
    profileId: string;
    zoneId: string;
}


// orderService

export type OrderSearchResponse = IResponse<IOrderSearch[]>
export type OrderSearchRequest = {
    q?: string;
    limit?: number;
    skip?: number;
    paymentStatus?: string;
    orderStatus?: string;
}

export type OrderTimelineSearchResponse = IResponse<ITimeline[]>
export type OrderTimelineSearchRequest = {
    orderId?: number;
    q?: string;
    limit?: number;
    skip?: number;
}

export type OrderGetByIdResponse = IResponse<IOrder>
export type OrderGetByIdRequest = {
    orderId: number
}

export type OrderFulfillmentGetByIdResponse = IResponse<IFulfillment>
export type OrderFulfillmentGetByIdRequest = {
    orderId: number,
    fulfillmentId: string;
}

export type OrderReturnGetByIdResponse = IResponse<IOrderReturn>
export type OrderReturnGetByIdRequest = {
    orderId: number,
    returnId: string;
}

export type OrderCreateResponse = IResponse<string>
export type OrderCreateRequest = {
    userId?: string;
    mailingCountry?: string;
    mailingCity?: string;
    mailingRegion?: string;
    mailingAddress?: string;
    note?: string | null;
    services?: Omit<IService, "id">[];
    offers?: Pick<IOffer, "id">[];
}

export type OrderUpdateResponse = IResponse<void>
export type OrderUpdateRequest = {
    orderId?: number;
    userId?: string;
    mailingCountry?: string;
    mailingCity?: string;
    mailingRegion?: string;
    mailingAddress?: string;
    note?: string | null;
    createServices?: Omit<IService, "id">[];
    createOffers?: Pick<IOffer, "id">[];
    deleteServices?: Pick<IService, "id">[];
    deleteOffers?: Pick<IOffer, "id">[];
}

export type OrderConfirmPaymentUpdateResponse = IResponse<void>
export type OrderConfirmPaymentUpdateRequest = {
    orderId?: number;
}

export type OrderFulfillmentCreateResponse = IResponse<string>
export type OrderFulfillmentCreateRequest = {
    orderId?: number;
    offers?: Pick<IOffer, "id">[];
}

export type OrderFulfillmentUpdateResponse = IResponse<void>
export type OrderFulfillmentUpdateRequest = {
    orderId?: number;
    fulfillmentId?: string;
    carrier?: string;
    tracking?: string;
    status?: FulfillmentStatus;
}

export type OrderFulfillmentDeleteResponse = IResponse<void>
export type OrderFulfillmentDeleteRequest = {
    orderId?: number;
    fulfillmentId?: string;
}

export type OrderReturnCreateResponse = IResponse<string>
export type OrderReturnCreateRequest = {
    orderId?: number;
    offers?: Pick<IReturnProduct, "id" | "reason">[];
}

export type OrderReturnUpdateResponse = IResponse<void>
export type OrderReturnUpdateRequest = {
    orderId?: number;
    returnId?: string;
    status?: ReturnStatus;
    carrier?: string;
    tracking?: string;
}

export type OrderReturnDeleteResponse = IResponse<void>
export type OrderReturnDeleteRequest = {
    orderId?: number;
    returnId?: string;
}



// settingService

export type SettingSearchResponse = IResponse<ISetting[]>
export type SettingSearchRequest = {
    setting: string;
}


export type SettingUpdateResponse = IResponse<void>
export type SettingUpdateRequest = {
    updateSettings: Pick<ISetting, 'setting' | 'title' | 'value'>[]
}