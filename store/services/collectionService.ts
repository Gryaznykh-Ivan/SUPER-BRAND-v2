import { api } from "../store/api";
import { CollectionGetByHandleRequest, CollectionGetByHandleResponse, CollectionGetFiltersByHandleRequest, CollectionGetFiltersByHandleResponse, CollectionGetProductsByHandleRequest, CollectionGetProductsByHandleResponse } from "../types/api";

export const collectionService = api.injectEndpoints({
    endpoints: builder => ({
        getCollectionByHandle: builder.query<CollectionGetByHandleResponse, CollectionGetByHandleRequest>({
            query: ({ handle, ...rest }) => ({
                url: `v1/collections/${handle}`,
                method: "GET",
                params: rest
            }),
            providesTags: ["COLLECTION"]
        }),
        getCollectionProductsByHandle: builder.query<CollectionGetProductsByHandleResponse, CollectionGetProductsByHandleRequest>({
            query: ({ handle, ...rest }) => ({
                url: `v1/collections/${handle}/products`,
                method: "GET",
                params: rest
            }),
            providesTags: ["COLLECTION_PRODUCTS"]
        }),
        getCollectionFiltersByHandle: builder.query<CollectionGetFiltersByHandleResponse, CollectionGetFiltersByHandleRequest>({
            query: ({ handle, ...rest }) => ({
                url: `v1/collections/${handle}/filters`,
                method: "GET",
                params: rest
            }),
            providesTags: ["COLLECTION_FILTERS"]
        }),
    })
})

export const {
    useGetCollectionByHandleQuery,
    useGetCollectionFiltersByHandleQuery,
    useGetCollectionProductsByHandleQuery,
} = collectionService
