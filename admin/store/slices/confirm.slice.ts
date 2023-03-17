import jwt_decode from 'jwt-decode'
import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { IAuthState, IConfirmState, IJwtDecode } from "../../types/store";

const initialState: IConfirmState = {
    show: false,
    title: "",
    message: ""
}

const confirmSlice = createSlice({
    name: "confirm",
    initialState,
    reducers: {
        showConfirm: (state, { payload }) => {
            state.show = true
            state.title = payload.title
            state.message = payload.message
        },
        hideConfirm: (state) => {
            state.show = initialState.show
            state.title = initialState.title
            state.message = initialState.message
        }
    }
})

export default confirmSlice.reducer

export const {
    showConfirm,
    hideConfirm
} = confirmSlice.actions