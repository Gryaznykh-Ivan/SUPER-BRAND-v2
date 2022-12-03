import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NODE_ENV === 'production' ? 'http://example.com/' : 'http://api.sb.com/',
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        // set Bearer authorization token 

        return headers
    }
});

const baseQueryWithLogic: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // catch 401 error code and refresh token

    return result;
};


export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithLogic,
    tagTypes: [],
    endpoints: (builder) => ({}),
})

