import { createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";

const initialState = {
    status: false,
    userDate: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: false,
        userData: null  // Changed from userDate to userData
    },
    reducers: {
        login: (state, action) => {
            console.log("User logged in:", action.payload.userData);

            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false
            state.userData = null;
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer