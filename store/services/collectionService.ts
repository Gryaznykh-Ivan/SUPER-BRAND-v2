import { api } from "../store/api";
import { CollectionGetByHandleRequest, CollectionGetByHandleResponse, CollectionGetFiltersByHandleRequest, CollectionGetFiltersByHandleResponse, CollectionGetProductsByHandleRequest, CollectionGetProductsByHandleResponse, CollectionGetProductsRecommendationByHandleRequest, CollectionGetProductsRecommendationByHandleResponse } from "../types/api";

export const collectionService = api.injectEndpoints({
    endpoints: builder => ({
        getCollectionByHandle: builder.query<CollectionGetByHandleResponse, CollectionGetByHandleRequest>({
            query: ({ handle, ...rest }) => ({
                url: `v1/collections/${handle}`,
                method: "GET",
                params: rest
            })
        }),
        getCollectionProductsByHandle: builder.query<CollectionGetProductsByHandleResponse, CollectionGetProductsByHandleRequest>({
            query: ({ handle, ...rest }) => ({
                url: `v1/collections/${handle}/products`,
                method: "GET",
                params: rest
            })
        }),
        getCollectionProductsRecommendationByHandle: builder.query<CollectionGetProductsRecommendationByHandleResponse, CollectionGetProductsRecommendationByHandleRequest>({
            query: ({ handle, ...rest }) => ({
                url: `v1/collections/${handle}/recommendation`,
                method: "GET",
                params: rest
            })
        }),
        getCollectionFiltersByHandle: builder.query<CollectionGetFiltersByHandleResponse, CollectionGetFiltersByHandleRequest>({
            query: ({ handle, ...rest }) => ({
                url: `v1/collections/${handle}/filters`,
                method: "GET",
                params: rest
            })
        }),
    })
})

export const {
    useGetCollectionByHandleQuery,
    useGetCollectionFiltersByHandleQuery,
    useGetCollectionProductsByHandleQuery,
    useGetCollectionProductsRecommendationByHandleQuery,
    useLazyGetCollectionProductsRecommendationByHandleQuery,
} = collectionService
