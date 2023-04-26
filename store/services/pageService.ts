import { api } from "../store/api";
import { PageGetByHandleResponse, PageGetByHandleRequest } from "../types/api";

export const pageService = api.injectEndpoints({
    endpoints: builder => ({
        getPageByHandle: builder.query<PageGetByHandleResponse, PageGetByHandleRequest>({
            query: ({ handle }) => ({
                url: `v1/pages/${handle}`,
                method: "GET",
            }),
            providesTags: ["PAGE"]
        }),
    })
})

export const {
    useGetPageByHandleQuery,
    useLazyGetPageByHandleQuery,
} = pageService
