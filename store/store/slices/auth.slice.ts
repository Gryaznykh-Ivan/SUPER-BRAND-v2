import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../types/store";


const initialState: IAuthState = {
    isAuth: false,
    payload: null,
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
})

export default authSlice.reducer