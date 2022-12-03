import { api } from "../store/api";
import { LoginRequest, LoginResponse, LogoutRequest, LogoutResponse, RefreshRequest, RefreshResponse } from "../types/api";

export const authService = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: "auth/login/user",
                method: "POST",
                body: credentials
            })
        }),
        refresh: builder.mutation<RefreshResponse, RefreshRequest>({
            query: () => ({
                url: "auth/refresh/user",
                method: "POST"
            })
        }),
        logout: builder.mutation<LogoutResponse, LogoutRequest>({
            query: () => ({
                url: "auth/logout/user",
                method: "POST"
            })
        })
    })
})

export const {
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation
} = authService