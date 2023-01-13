import { api } from "../store/api";
import { VariantCreateRequest, VariantCreateResponse, VariantDeleteRequest, VariantDeleteResponse, VariantGetAllRequest, VariantGetAllResponse, VariantGetByIdRequest, VariantGetByIdResponse, VariantGetOptionsRequest, VariantGetOptionsResponse, VariantRemoveImageRequest, VariantRemoveImageResponse, VariantUpdateImageRequest, VariantUpdateImageResponse, VariantUpdateRequest, VariantUpdateResponse, VariantUploadImagesRequest, VariantUploadImagesResponse } from "../types/api";

export const variantService = api.injectEndpoints({
    endpoints: builder => ({
        getVariants: builder.query<VariantGetAllResponse, VariantGetAllRequest>({
            query: ({ productId }) => ({
                url: `variants/getAll/${productId}`,
                method: "GET",
            }),
            providesTags: ["VARIANTS"]
        }),
        getVariantOptions: builder.query<VariantGetOptionsResponse, VariantGetOptionsRequest>({
            query: ({ productId }) => ({
                url: `variants/getOptions/${productId}`,
                method: "GET",
            }),
            providesTags: ["OPTIONS"]
        }),
        getVariantById: builder.query<VariantGetByIdResponse, VariantGetByIdRequest>({
            query: ({ variantId }) => ({
                url: `variants/${variantId}`,
                method: "GET",
            }),
            providesTags: ["VARIANT"]
        }),
        createVariant: builder.mutation<VariantCreateResponse, VariantCreateRequest>({
            query: (credentials) => ({
                url: "variants/create",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["VARIANTS"]
        }),
        updateVariant: builder.mutation<VariantUpdateResponse, VariantUpdateRequest>({
            query: ({ variantId, ...rest }) => ({
                url: `variants/${variantId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["VARIANTS", "VARIANT"]
        }),
        deleteVariant: builder.mutation<VariantDeleteResponse, VariantDeleteRequest>({
            query: ({ variantId }) => ({
                url: `variants/${variantId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["VARIANTS"]
        }),
        uploadVariantImages: builder.mutation<VariantUploadImagesResponse, VariantUploadImagesRequest>({
            query: ({ variantId, formData }) => ({
                url: `variants/${variantId}/uploadImages`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["VARIANT", "VARIANTS"]
        }),
        updateVariantImage: builder.mutation<VariantUpdateImageResponse, VariantUpdateImageRequest>({
            query: ({ variantId, imageId, ...rest }) => ({
                url: `variants/${variantId}/updateImage/${imageId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["VARIANT", "VARIANTS"]
        }),
        removeVariantImage: builder.mutation<VariantRemoveImageResponse, VariantRemoveImageRequest>({
            query: ({ variantId, imageId }) => ({
                url: `variants/${variantId}/removeImage/${imageId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["VARIANT", "VARIANTS"]
        })
    })
})

export const {
    useGetVariantsQuery,
    useGetVariantOptionsQuery,
    useGetVariantByIdQuery,
    useCreateVariantMutation,
    useUpdateVariantMutation,
    useDeleteVariantMutation,
    useUploadVariantImagesMutation,
    useUpdateVariantImageMutation,
    useRemoveVariantImageMutation
} = variantService
