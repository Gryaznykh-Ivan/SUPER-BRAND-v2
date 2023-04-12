import { api } from "../store/api";
import { PageCreateRequest, PageCreateResponse, PageDeleteRequest, PageDeleteResponse, PageGetByIdRequest, PageGetByIdResponse, PageSearchRequest, PageSearchResponse, PageUpdateRequest, PageUpdateResponse } from "../types/api";

export const pageService = api.injectEndpoints({
    endpoints: builder => ({
        getPagesBySearch: builder.query<PageSearchResponse, PageSearchRequest>({
            query: (credentials) => ({
                url: "pages/search",
                method: "GET",
                params: credentials
            }),
            providesTags: ["PAGES"]
        }),
        getPageById: builder.query<PageGetByIdResponse, PageGetByIdRequest>({
            query: ({ pageId }) => ({
                url: `pages/${pageId}`,
                method: "GET",
            }),
            providesTags: ["PAGE"]
        }),
        createPage: builder.mutation<PageCreateResponse, PageCreateRequest>({
            query: (credentials) => ({
                url: "pages/create",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["PAGES"]
        }),
        updatePage: builder.mutation<PageUpdateResponse, PageUpdateRequest>({
            query: ({ pageId, ...rest }) => ({
                url: `pages/${pageId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["PAGE"]
        }),
        deletePage: builder.mutation<PageDeleteResponse, PageDeleteRequest>({
            query: ({ pageId }) => ({
                url: `pages/${pageId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["PAGES"]
        })
    })
})

export const {
    useLazyGetPagesBySearchQuery,
    useGetPageByIdQuery,
    useCreatePageMutation,
    useDeletePageMutation,
    useUpdatePageMutation
} = pageService
