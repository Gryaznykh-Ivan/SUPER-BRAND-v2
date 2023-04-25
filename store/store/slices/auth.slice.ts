import jwt_decode from 'jwt-decode'
import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { IAuthState, IJwtDecode } from "../../types/store";
import { HYDRATE, } from 'next-redux-wrapper';

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
            const decoded: IJwtDecode = jwt_decode(payload.data)

            state.isAuth = true
            state.token = payload.data
            state.payload = decoded
        },
        logout: (state) => {
            state.isAuth = false
            state.token = null
            state.payload = null
        },
        test: (state) => {
            state.isAuth = true
        }
    },
    extraReducers: builder => {

        builder.addMatcher(
            authService.endpoints.login.matchFulfilled,
            authSlice.caseReducers.login
        )

        builder.addMatcher(
            authService.endpoints.refresh.matchFulfilled,
            authSlice.caseReducers.login
        )

        builder.addMatcher(
            authService.endpoints.logout.matchFulfilled,
            authSlice.caseReducers.logout
        )
    }
})

export default authSlice

export const {
    login,
    test
} = authSlice.actions