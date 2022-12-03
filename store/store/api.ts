import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NODE_ENV === 'production' ? 'http://localhost:3000/' : 'http://localhost:3000/',
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
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({}),
})

