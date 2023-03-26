import { api } from "../store/api";
import { ProductGetBySearchRequest, ProductGetBySearchResponse, ProductsUpdateRequest, ProductsUpdateResponse } from "../types/api";

export const productService = api.injectEndpoints({
    endpoints: builder => ({
        getProductsBySearch: builder.query<ProductGetBySearchResponse, ProductGetBySearchRequest>({
            query: (credentials) => ({
                url: "products/search",
                method: "GET",
                params: credentials
            }),
            providesTags: ["PRODUCTS"]
        }),
        updateProducts: builder.mutation<ProductsUpdateResponse, ProductsUpdateRequest>({
            query: (credentials) => ({
                url: "products/update",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["PRODUCTS"]
        }),
    })
})

export const {
    useLazyGetProductsBySearchQuery,
    useUpdateProductsMutation
} = productService

