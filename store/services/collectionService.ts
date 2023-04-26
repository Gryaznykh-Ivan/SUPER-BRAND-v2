import { api } from "../store/api";
import { CollectionGetByHandleResponse, CollectionGetByHandleRequest } from "../types/api";

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
    })
})

export const {
    useGetCollectionByHandleQuery,
    useLazyGetCollectionByHandleQuery
} = collectionService
