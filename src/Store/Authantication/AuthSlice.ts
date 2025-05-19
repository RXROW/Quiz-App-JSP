// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { AuthApiSlice } from "./AuthApi";

const initialState = {
  token: localStorage.getItem("token") || null,
  // user: null,
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      AuthApiSlice.endpoints.login.matchFulfilled,
      (state, action) => {
        // state.token = action.payload.data.accessToken;
        // localStorage.setItem("token", action.payload.data.accessToken);
        // state.user = action.payload.data.user;
        const { accessToken, profile } = action.payload.data;
        state.token = accessToken;
        state.user = profile;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(profile));
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
