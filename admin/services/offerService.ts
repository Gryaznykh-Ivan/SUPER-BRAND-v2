import { api } from "../store/api";
import { OfferCreateRequest, OfferCreateResponse, OfferDeleteRequest, OfferDeleteResponse, OfferGetByIdRequest, OfferGetByIdResponse, OfferSearchRequest, OfferSearchResponse, OfferUpdateRequest, OfferUpdateResponse} from "../types/api";

export const offerService = api.injectEndpoints({
    endpoints: builder => ({
        getOffersBySearch: builder.query<OfferSearchResponse, OfferSearchRequest>({
            query: (credentials) => ({
                url: "offers/search",
                method: "GET",
                params: credentials
            }),
            providesTags: ["OFFERS"]
        }),
        getOfferById: builder.query<OfferGetByIdResponse, OfferGetByIdRequest>({
            query: ({ offerId }) => ({
                url: `offers/${offerId}`,
                method: "GET",
            }),
            providesTags: ["OFFER"]
        }),
        createOffer: builder.mutation<OfferCreateResponse, OfferCreateRequest>({
            query: (credentials) => ({
                url: "offers/create",
                method: "POST",
                body: credentials
            }),
        }),
        updateOffer: builder.mutation<OfferUpdateResponse, OfferUpdateRequest>({
            query: ({ offerId, ...rest }) => ({
                url: `offers/${offerId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["OFFER"]
        }),
        deleteOffer: builder.mutation<OfferDeleteResponse, OfferDeleteRequest>({
            query: ({ offerId }) => ({
                url: `offers/${offerId}`,
                method: "DELETE"
            }),
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
