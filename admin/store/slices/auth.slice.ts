import jwt_decode from 'jwt-decode'
import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { IAuthState } from "../../types/store";

const initialState: IAuthState = {
    isAuth: false,
    payload: null,
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.isAuth = true
            state.token = payload.data
            state.payload = jwt_decode(payload.data)
        },
        refresh: (state, { payload }) => {
            state.isAuth = true
            state.token = payload.data
            state.payload = jwt_decode(payload.data)
        },
        logout: (state) => {
            state.isAuth = false
            state.token = null
            state.payload = null
        }
    },
    extraReducers: builder => {

        builder.addMatcher(
            authService.endpoints.login.matchFulfilled,
            authSlice.caseReducers.login
        )

        builder.addMatcher(
            authService.endpoints.logout.matchFulfilled,
            authSlice.caseReducers.logout
        )

        builder.addMatcher(
            authService.endpoints.refresh.matchFulfilled,
            authSlice.caseReducers.refresh
        )
    }
})

export default authSlice.reducer

export const {
    login
} = authSlice.actions