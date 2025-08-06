import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userDate: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.status.userDate = action.payload.userDate
        },
        logout: (state) => {
            state.status = false
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer