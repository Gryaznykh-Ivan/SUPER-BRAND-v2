import { api } from "../store/api";
import { ProductCreateOptionRequest, ProductCreateOptionResponse, ProductCreateRequest, ProductCreateResponse, ProductDeleteRequest, ProductDeleteResponse, ProductGetByIdRequest, ProductGetByIdResponse, ProductRemoveImageRequest, ProductRemoveImageResponse, ProductRemoveOptionRequest, ProductRemoveOptionResponse, ProductSearchRequest, ProductSearchResponse, ProductUpdateImageRequest, ProductUpdateImageResponse, ProductUpdateOptionRequest, ProductUpdateOptionResponse, ProductUpdateRequest, ProductUpdateResponse, ProductUploadImagesRequest, ProductUploadImagesResponse } from "../types/api";

export const productService = api.injectEndpoints({
    endpoints: builder => ({
        getProductsBySearch: builder.query<ProductSearchResponse, ProductSearchRequest>({
            query: (credentials) => ({
                url: "products/search",
                method: "GET",
                params: credentials
            }),
            providesTags: ["PRODUCTS"]
        }),
        getProductById: builder.query<ProductGetByIdResponse, ProductGetByIdRequest>({
            query: ({ productId }) => ({
                url: `products/${productId}`,
                method: "GET",
            }),
            providesTags: ["PRODUCT"]
        }),
        createProduct: builder.mutation<ProductCreateResponse, ProductCreateRequest>({
            query: (credentials) => ({
                url: "products/create",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["PRODUCTS"]
        }),
        updateProduct: builder.mutation<ProductUpdateResponse, ProductUpdateRequest>({
            query: ({ productId, ...rest }) => ({
                url: `products/${productId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["PRODUCT", "COLLECTION"]
        }),
        deleteProduct: builder.mutation<ProductDeleteResponse, ProductDeleteRequest>({
            query: ({ productId }) => ({
                url: `products/${productId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["OFFER", "OFFERS"]
        }),
        uploadProductImages: builder.mutation<ProductUploadImagesResponse, ProductUploadImagesRequest>({
            query: ({ productId, formData }) => ({
                url: `products/${productId}/uploadImages`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["PRODUCT", "OFFER", "OFFERS"]
        }),
        updateProductImage: builder.mutation<ProductUpdateImageResponse, ProductUpdateImageRequest>({
            query: ({ productId, imageId, ...rest }) => ({
                url: `products/${productId}/updateImage/${imageId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["PRODUCT", "OFFER", "OFFERS"]
        }),
        removeProductImage: builder.mutation<ProductRemoveImageResponse, ProductRemoveImageRequest>({
            query: ({ productId, imageId }) => ({
                url: `products/${productId}/removeImage/${imageId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["PRODUCT", "OFFER", "OFFERS"]
        }),
        createOption: builder.mutation<ProductCreateOptionResponse, ProductCreateOptionRequest>({
            query: ({ productId, ...rest }) => ({
                url: `products/${productId}/createOption`,
                method: "POST",
                body: rest
            }),
            invalidatesTags: ["PRODUCT", "VARIANTS", "VARIANT", "OPTIONS", "OFFER", "OFFERS"]
        }),
        updateOption: builder.mutation<ProductUpdateOptionResponse, ProductUpdateOptionRequest>({
            query: ({ productId, optionId, ...rest }) => ({
                url: `products/${productId}/updateOption/${optionId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["PRODUCT", "VARIANTS", "VARIANT", "OPTIONS", "OFFER", "OFFERS"]
        }),
        removeOption: builder.mutation<ProductRemoveOptionResponse, ProductRemoveOptionRequest>({
            query: ({ productId, optionId }) => ({
                url: `products/${productId}/removeOption/${optionId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["PRODUCT", "VARIANTS", "VARIANT", "OPTIONS", "OFFER", "OFFERS"]
        })
    })
})

export const {
    useLazyGetProductsBySearchQuery,
    useGetProductByIdQuery,
    useCreateOptionMutation,
    useCreateProductMutation,
    useDeleteProductMutation,
    useRemoveProductImageMutation,
    useUploadProductImagesMutation,
    useUpdateProductImageMutation,
    useUpdateOptionMutation,
    useRemoveOptionMutation,
    useUpdateProductMutation
} = productService
