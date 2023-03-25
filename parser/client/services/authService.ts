import { api } from "../store/api";
import { LogoutRequest, LogoutResponse, RefreshRequest, RefreshResponse } from "../types/api";

export const authService = api.injectEndpoints({
    endpoints: builder => ({
        refresh: builder.mutation<RefreshResponse, RefreshRequest>({
            query: () => ({
                url: "auth/refresh",
                method: "POST"
            })
        }),
        logout: builder.mutation<LogoutResponse, LogoutRequest>({
            query: () => ({
                url: "auth/logout",
                method: "POST"
            })
        })
    })
})

export const {
    useRefreshMutation,
    useLogoutMutation,
} = authService

export const {
    refresh,
    logout
} = authService.endpoints
