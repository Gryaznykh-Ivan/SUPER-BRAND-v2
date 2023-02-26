import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '.';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as AppState

        if (state.auth.isAuth === true) {
            headers.set("Authorization", `Bearer ${state.auth.token}`)
        }

        return headers
    }
});

const baseQueryWithLogic: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (typeof window === "undefined") {
        return result // Не рефрешим токин на сервере
    }

    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery({ url: '/auth/refresh', method: "POST" }, api, extraOptions)
        if (refreshResult.data) {
            api.dispatch({ type: "auth/login", payload: refreshResult.data })

            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch({ type: "auth/logout" })
        }
    }

    return result
};


export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithLogic,
    tagTypes: [
        "ORDER",
        "ORDERS",
        "USER",
        "USERS",
        "PRODUCT",
        "PRODUCTS",
        "VARIANTS",
        "VARIANT",
        "OPTIONS",
        "COLLECTIONS",
        "COLLECTION",
        "COLLECTION_PRODUCTS",
        "OFFER",
        "OFFERS",
        "DELIVERY_PROFILE",
        "DELIVERY_PROFILES",
        "DELIVERY_ZONES"
    ],
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({}),
})

