import { api } from "../store/api";
import { CitiesSuggestionRequest, CitiesSuggestionResponse, CountriesSuggestionRequest, CountriesSuggestionResponse, RegionsSuggestionRequest, RegionsSuggestionResponse } from "../types/api";

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
    })
})

export const {
    useLazyCitiesQuery,
    useLazyCountriesQuery,
    useLazyRegionsQuery
} = suggestionService
