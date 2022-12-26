import { api } from "../store/api";
import { LoginRequest, LoginResponse, LogoutRequest, LogoutResponse, RefreshRequest, RefreshResponse, SendCodeRequest, SendCodeResponse } from "../types/api";

export const authService = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: credentials
            })
        }),
        refresh: builder.mutation<RefreshResponse, RefreshRequest>({
            query: () => ({
                url: "auth/refresh",
                method: "POST"
            })
        }),
        sendCode: builder.mutation<SendCodeResponse, SendCodeRequest>({
            query: (credentials) => ({
                url: "auth/sendCode",
                method: "POST",
                body: credentials
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
    useLoginMutation,
    useRefreshMutation,
    useSendCodeMutation,
    useLogoutMutation,
} = authService