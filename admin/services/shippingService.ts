import { api } from "../store/api";
import { DeliveryProfileCreateRequest, DeliveryProfileCreateResponse, DeliveryProfileDeleteRequest, DeliveryProfileDeleteResponse, DeliveryProfileGetAllRequest, DeliveryProfileGetAllResponse, DeliveryProfileGetByIdRequest, DeliveryProfileGetByIdResponse, DeliveryProfileGetDeliveryZonesRequest, DeliveryProfileGetDeliveryZonesResponse, DeliveryProfileUpdateRequest, DeliveryProfileUpdateResponse, DeliveryZoneCreateRequest, DeliveryZoneCreateResponse, DeliveryZoneDeleteRequest, DeliveryZoneDeleteResponse, DeliveryZoneUpdateRequest, DeliveryZoneUpdateResponse } from "../types/api";

export const shippingService = api.injectEndpoints({
    endpoints: builder => ({
        getAllDeliveryProfile: builder.query<DeliveryProfileGetAllResponse, DeliveryProfileGetAllRequest>({
            query: () => ({
                url: "shipping/getAll",
                method: "GET"
            }),
            providesTags: ["DELIVERY_PROFILES"]
        }),
        getDeliveryZones: builder.query<DeliveryProfileGetDeliveryZonesResponse, DeliveryProfileGetDeliveryZonesRequest>({
            query: ({ profileId, ...rest }) => ({
                url: `shipping/${profileId}/getDeliveryZones`,
                method: "GET",
                params: rest
            }),
            providesTags: ["DELIVERY_ZONES"]
        }),
        getDeliveryProfileById: builder.query<DeliveryProfileGetByIdResponse, DeliveryProfileGetByIdRequest>({
            query: ({ profileId }) => ({
                url: `shipping/${profileId}`,
                method: "GET"
            }),
            providesTags: ["DELIVERY_PROFILE"]
        }),
        createDeliveryProfile: builder.mutation<DeliveryProfileCreateResponse, DeliveryProfileCreateRequest>({
            query: (credentials) => ({
                url: "shipping/create",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["DELIVERY_PROFILES"]
        }),
        createDeliveryZone: builder.mutation<DeliveryZoneCreateResponse, DeliveryZoneCreateRequest>({
            query: ({ profileId, ...rest }) => ({
                url: `shipping/${profileId}/createDeliveryZone`,
                method: "POST",
                body: rest
            }),
            invalidatesTags: ["DELIVERY_ZONES", "DELIVERY_PROFILES"]
        }),
        updateDeliveryProfile: builder.mutation<DeliveryProfileUpdateResponse, DeliveryProfileUpdateRequest>({
            query: ({ profileId, ...rest }) => ({
                url: `shipping/${profileId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["DELIVERY_PROFILES", "DELIVERY_PROFILE", "OFFERS"]
        }),
        updateDeliveryZone: builder.mutation<DeliveryZoneUpdateResponse, DeliveryZoneUpdateRequest>({
            query: ({ profileId, zoneId, ...rest }) => ({
                url: `shipping/${profileId}/updateDeliveryZone/${zoneId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["DELIVERY_ZONES"]
        }),
        deleteDeliveryZone: builder.mutation<DeliveryZoneDeleteResponse, DeliveryZoneDeleteRequest>({
            query: ({ profileId, zoneId }) => ({
                url: `shipping/${profileId}/removeDeliveryZone/${zoneId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["DELIVERY_ZONES", "DELIVERY_PROFILES"]
        }),
        deleteDeliveryProfile: builder.mutation<DeliveryProfileDeleteResponse, DeliveryProfileDeleteRequest>({
            query: ({ profileId }) => ({
                url: `shipping/${profileId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["DELIVERY_PROFILES"]
        })
    })
})

export const {
    useGetAllDeliveryProfileQuery,
    useGetDeliveryProfileByIdQuery,
    useLazyGetDeliveryZonesQuery,
    useCreateDeliveryProfileMutation,
    useCreateDeliveryZoneMutation,
    useUpdateDeliveryProfileMutation,
    useUpdateDeliveryZoneMutation,
    useDeleteDeliveryProfileMutation,
    useDeleteDeliveryZoneMutation
} = shippingService
