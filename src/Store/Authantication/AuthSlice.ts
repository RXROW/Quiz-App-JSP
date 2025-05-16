// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { AuthApiSlice } from "./AuthApi";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      AuthApiSlice.endpoints.login.matchFulfilled,
      (state, action) => {
        console.log(" Login payload:", action.payload); 
        const token = action.payload.accessToken;
        const user = action.payload.user;

        state.token = token;
        state.user = user;

        localStorage.setItem("token", token);
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
