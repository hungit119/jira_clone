import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: true,
    isAuthenticated: false,
    user: {
      username: "",
      avatar: "",
    },
  },
  reducers: {
    loadUser: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    }, // =>  {type:'auth/loadUser'}
  },
});

export const { loadUser } = authSlice.actions;
export default authSlice.reducer;
