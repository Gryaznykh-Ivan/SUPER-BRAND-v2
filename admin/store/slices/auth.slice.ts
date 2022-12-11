import jwt_decode from 'jwt-decode'
import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { IAuthState, IJwtDecode } from "../../types/store";

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
            state.token = payload.token
            state.payload = payload.decode
        },
        logout: (state) => {
            localStorage.removeItem("token");

            state.isAuth = false
            state.token = null
            state.payload = null
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            authService.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                localStorage.setItem("token", payload.data);

                state.isAuth = true
                state.token = payload.data
                state.payload = jwt_decode(payload.data)
            }
        )

        builder.addMatcher(
            authService.endpoints.logout.matchFulfilled,
            (state) => {
                localStorage.removeItem("token");

                state.isAuth = false
                state.token = null
                state.payload = null
            }
        )

        builder.addMatcher(
            authService.endpoints.refresh.matchFulfilled,
            (state, { payload }) => {
                localStorage.setItem("token", payload.data);

                state.isAuth = true
                state.token = payload.data
                state.payload = jwt_decode(payload.data)
            }
        )
    }
})

export default authSlice.reducer