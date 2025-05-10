import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;
