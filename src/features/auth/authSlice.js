import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null, // spelling fix
    loading: true   // 👈 include loading
};

const authSlice = createSlice({
    name: "auth",
    initialState,   // 👈 use this
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.loading = false; // auth done
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload; // true/false
        }
    }
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
