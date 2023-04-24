import { api } from "../store/api";
import { OfferCreateRequest, OfferCreateResponse, OfferDeleteRequest, OfferDeleteResponse, OfferGetByIdRequest, OfferGetByIdResponse, OfferSearchRequest, OfferSearchResponse, OfferUpdateRequest, OfferUpdateResponse} from "../types/api";

export const offerService = api.injectEndpoints({
    endpoints: builder => ({
        getOffersBySearch: builder.query<OfferSearchResponse, OfferSearchRequest>({
            query: (credentials) => ({
                url: "admin/offers/search",
                method: "GET",
                params: credentials
            }),
            providesTags: ["OFFERS"]
        }),
        getOfferById: builder.query<OfferGetByIdResponse, OfferGetByIdRequest>({
            query: ({ offerId }) => ({
                url: `admin/offers/${offerId}`,
                method: "GET",
            }),
            providesTags: ["OFFER"]
        }),
        createOffer: builder.mutation<OfferCreateResponse, OfferCreateRequest>({
            query: (credentials) => ({
                url: "admin/offers/create",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["VARIANTS", "DELIVERY_PROFILES"]
        }),
        updateOffer: builder.mutation<OfferUpdateResponse, OfferUpdateRequest>({
            query: ({ offerId, ...rest }) => ({
                url: `admin/offers/${offerId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["OFFER", "VARIANTS", "DELIVERY_PROFILES"]
        }),
        deleteOffer: builder.mutation<OfferDeleteResponse, OfferDeleteRequest>({
            query: ({ offerId }) => ({
                url: `admin/offers/${offerId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["VARIANTS"]
        })
    })
})

export const {
    useLazyGetOffersBySearchQuery,
    useGetOfferByIdQuery,
    useCreateOfferMutation,
    useDeleteOfferMutation,
    useUpdateOfferMutation
} = offerService
