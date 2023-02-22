import { api } from "../store/api";
import { CitiesSuggestionRequest, CitiesSuggestionResponse, CollectionsSuggestionRequest, CollectionsSuggestionResponse, CountriesSuggestionRequest, CountriesSuggestionResponse, DeliveryOptionsSuggestionRequest, DeliveryOptionsSuggestionResponse, DeliveryProfilesSuggestionRequest, DeliveryProfilesSuggestionResponse, DeliveryZonesSuggestionRequest, deliveryZonesSuggestionResponse, RegionsSuggestionRequest, RegionsSuggestionResponse, VendorsSuggestionRequest, VendorsSuggestionResponse } from "../types/api";

export const suggestionService = api.injectEndpoints({
    endpoints: builder => ({
        countries: builder.query<CountriesSuggestionResponse, CountriesSuggestionRequest>({
            query: (credentials) => ({
                url: "suggestions/countries",
                method: "GET",
                params: credentials
            })
        }),
        regions: builder.query<RegionsSuggestionResponse, RegionsSuggestionRequest>({
            query: (credentials) => ({
                url: "suggestions/regions",
                method: "GET",
                params: credentials
            })
        }),
        cities: builder.query<CitiesSuggestionResponse, CitiesSuggestionRequest>({
            query: (credentials) => ({
                url: "suggestions/cities",
                method: "GET",
                params: credentials
            })
        }),
        collections: builder.query<CollectionsSuggestionResponse, CollectionsSuggestionRequest>({
            query: (credentials) => ({
                url: "suggestions/collections",
                method: "GET",
                params: credentials
            })
        }),
        vendors: builder.query<VendorsSuggestionResponse, VendorsSuggestionRequest>({
            query: (credentials) => ({
                url: "suggestions/vendors",
                method: "GET",
                params: credentials
            })
        }),
        deliveryProfiles: builder.query<DeliveryProfilesSuggestionResponse, DeliveryProfilesSuggestionRequest>({
            query: () => ({
                url: "suggestions/deliveryProfiles",
                method: "GET"
            }),
            providesTags: ["DELIVERY_PROFILES"]
        }),
        deliveryZones: builder.query<deliveryZonesSuggestionResponse, DeliveryZonesSuggestionRequest>({
            query: (credentials) => ({
                url: "suggestions/deliveryZones",
                method: "GET",
                params: credentials
            })
        }),
        deliveryOptions: builder.query<DeliveryOptionsSuggestionResponse, DeliveryOptionsSuggestionRequest>({
            query: (credentials) => ({
                url: "suggestions/deliveryOptions",
                method: "GET",
                params: credentials
            })
        }),
    })
})

export const {
    useDeliveryProfilesQuery,
    useLazyCitiesQuery,
    useLazyDeliveryZonesQuery,
    useLazyCountriesQuery,
    useLazyRegionsQuery,
    useLazyCollectionsQuery,
    useLazyVendorsQuery,
    useLazyDeliveryOptionsQuery
} = suggestionService
