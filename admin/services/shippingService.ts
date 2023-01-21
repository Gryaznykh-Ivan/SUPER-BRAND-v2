import { api } from "../store/api";
import { DeliveryProfileCreateRequest, DeliveryProfileCreateResponse, DeliveryProfileDeleteRequest, DeliveryProfileDeleteResponse, DeliveryProfileGetAllRequest, DeliveryProfileGetAllResponse, DeliveryProfileUpdateRequest, DeliveryProfileUpdateResponse, DeliveryZoneCreateRequest, DeliveryZoneCreateResponse, DeliveryZoneDeleteRequest, DeliveryZoneDeleteResponse, DeliveryZoneUpdateRequest, DeliveryZoneUpdateResponse } from "../types/api";

export const shippingService = api.injectEndpoints({
    endpoints: builder => ({
        getAllDeliveryProfile: builder.query<DeliveryProfileGetAllResponse, DeliveryProfileGetAllRequest>({
            query: () => ({
                url: "shippings/getAll",
                method: "GET"
            }),
            providesTags: ["DELIVERY_PROFILE"]
        }),
        createDeliveryProfile: builder.mutation<DeliveryProfileCreateResponse, DeliveryProfileCreateRequest>({
            query: (credentials) => ({
                url: "shippings/create",
                method: "POST",
                body: credentials
            }),
        }),
        createDeliveryZone: builder.mutation<DeliveryZoneCreateResponse, DeliveryZoneCreateRequest>({
            query: ({ profileId, ...rest }) => ({
                url: `shippings/${profileId}/createDeliveryZone`,
                method: "POST",
                body: rest
            }),
        }),
        updateDeliveryProfile: builder.mutation<DeliveryProfileUpdateResponse, DeliveryProfileUpdateRequest>({
            query: ({ profileId, ...rest }) => ({
                url: `shippings/${profileId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["DELIVERY_PROFILE"]
        }),
        updateDeliveryZone: builder.mutation<DeliveryZoneUpdateResponse, DeliveryZoneUpdateRequest>({
            query: ({ profileId, zoneId, ...rest }) => ({
                url: `shippings/${profileId}/updateDeliveryZone/${zoneId}`,
                method: "PUT",
                body: rest
            }),
        }),
        deleteDeliveryZone: builder.mutation<DeliveryZoneDeleteResponse, DeliveryZoneDeleteRequest>({
            query: ({ profileId, zoneId }) => ({
                url: `shippings/${profileId}/removeDeliveryZone/${zoneId}`,
                method: "DELETE"
            }),
        }),
        deleteDeliveryProfile: builder.mutation<DeliveryProfileDeleteResponse, DeliveryProfileDeleteRequest>({
            query: ({ profileId }) => ({
                url: `shippings/${profileId}`,
                method: "DELETE"
            }),
        })
    })
})

export const {

} = shippingService
