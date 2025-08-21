import { createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";

const initialState = {
    status: false,
    userDate: null,
    loading: true
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: false,
        userData: null  // Changed from userDate to userData
    },
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false
            state.userData = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload; // true/false pass kar sakte ho
        }
    }
})

export const { login, logout, setLoading } = authSlice.actions

export default authSlice.reducer