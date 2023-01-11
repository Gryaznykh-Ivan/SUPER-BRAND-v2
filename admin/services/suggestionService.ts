import { api } from "../store/api";
import { CitiesSuggestionRequest, CitiesSuggestionResponse, CollectionsSuggestionRequest, CollectionsSuggestionResponse, CountriesSuggestionRequest, CountriesSuggestionResponse, RegionsSuggestionRequest, RegionsSuggestionResponse, VendorsSuggestionRequest, VendorsSuggestionResponse } from "../types/api";

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
    })
})

export const {
    useLazyCitiesQuery,
    useLazyCountriesQuery,
    useLazyRegionsQuery,
    useLazyCollectionsQuery,
    useLazyVendorsQuery
} = suggestionService
