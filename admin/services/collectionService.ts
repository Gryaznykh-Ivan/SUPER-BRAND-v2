import { api } from "../store/api";
import { CollectionCreateRequest, CollectionCreateResponse, CollectionDeleteRequest, CollectionDeleteResponse, CollectionGetByIdRequest, CollectionGetByIdResponse, CollectionGetProductsRequest, CollectionGetProductsResponse, CollectionRemoveImageRequest, CollectionRemoveImageResponse, CollectionSearchRequest, CollectionSearchResponse, CollectionUpdateImageRequest, CollectionUpdateImageResponse, CollectionUpdateRequest, CollectionUpdateResponse, CollectionUploadImagesRequest, CollectionUploadImagesResponse } from "../types/api";

export const collectionService = api.injectEndpoints({
    endpoints: builder => ({
        getCollectionsBySearch: builder.query<CollectionSearchResponse, CollectionSearchRequest>({
            query: (credentials) => ({
                url: "admin/collections/search",
                method: "GET",
                params: credentials
            }),
            providesTags: ["COLLECTIONS"]
        }),
        getCollectionProducts: builder.query<CollectionGetProductsResponse, CollectionGetProductsRequest>({
            query: ({ collectionId, ...credentials }) => ({
                url: `admin/collections/${collectionId}/getProducts`,
                method: "GET",
                params: credentials
            }),
            providesTags: ["COLLECTION_PRODUCTS"]
        }),
        getCollectionById: builder.query<CollectionGetByIdResponse, CollectionGetByIdRequest>({
            query: ({ collectionId }) => ({
                url: `admin/collections/${collectionId}`,
                method: "GET",
            }),
            providesTags: ["COLLECTION"]
        }),
        createCollection: builder.mutation<CollectionCreateResponse, CollectionCreateRequest>({
            query: (credentials) => ({
                url: "admin/collections/create",
                method: "POST",
                body: credentials
            }),
        }),
        updateCollection: builder.mutation<CollectionUpdateResponse, CollectionUpdateRequest>({
            query: ({ collectionId, ...rest }) => ({
                url: `admin/collections/${collectionId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["COLLECTION", "COLLECTION_PRODUCTS"]
        }),
        deleteCollection: builder.mutation<CollectionDeleteResponse, CollectionDeleteRequest>({
            query: ({ collectionId }) => ({
                url: `admin/collections/${collectionId}`,
                method: "DELETE"
            }),
        }),
        uploadCollectionImages: builder.mutation<CollectionUploadImagesResponse, CollectionUploadImagesRequest>({
            query: ({ collectionId, formData }) => ({
                url: `admin/collections/${collectionId}/uploadImages`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["COLLECTION"]
        }),
        updateCollectionImage: builder.mutation<CollectionUpdateImageResponse, CollectionUpdateImageRequest>({
            query: ({ collectionId, imageId, ...rest }) => ({
                url: `admin/collections/${collectionId}/updateImage/${imageId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["COLLECTION"]
        }),
        removeCollectionImage: builder.mutation<CollectionRemoveImageResponse, CollectionRemoveImageRequest>({
            query: ({ collectionId, imageId }) => ({
                url: `admin/collections/${collectionId}/removeImage/${imageId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["COLLECTION"]
        }),
    })
})

export const {
    useLazyGetCollectionsBySearchQuery,
    useGetCollectionByIdQuery,
    useLazyGetCollectionProductsQuery,
    useCreateCollectionMutation,
    useDeleteCollectionMutation,
    useRemoveCollectionImageMutation,
    useUploadCollectionImagesMutation,
    useUpdateCollectionImageMutation,
    useUpdateCollectionMutation
} = collectionService
