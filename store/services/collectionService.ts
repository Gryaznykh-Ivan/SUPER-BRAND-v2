import { api } from "../store/api";
import { CollectionGetInfoByHandleRequest, CollectionGetInfoByHandleResponse, CollectionGetProductsByHandleRequest, CollectionGetProductsByHandleResponse } from "../types/api";

export const collectionService = api.injectEndpoints({
    endpoints: builder => ({
        getCollectionInfoByHandle: builder.query<CollectionGetInfoByHandleResponse, CollectionGetInfoByHandleRequest>({
            query: ({ handle, ...rest }) => ({
                url: `v1/collections/${handle}/info`,
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
    })
})

export const {
    useGetCollectionInfoByHandleQuery,
    useGetCollectionProductsByHandleQuery
} = collectionService
