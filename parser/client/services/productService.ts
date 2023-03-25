import { api } from "../store/api";
import { ProductGetBySearchRequest, ProductGetBySearchResponse } from "../types/api";

export const productService = api.injectEndpoints({
    endpoints: builder => ({
        getProductsBySearch: builder.query<ProductGetBySearchResponse, ProductGetBySearchRequest>({
            query: (credentials) => ({
                url: "products/search",
                method: "GET",
                params: credentials
            })
        }),
    })
})

export const {
    useLazyGetProductsBySearchQuery
} = productService

