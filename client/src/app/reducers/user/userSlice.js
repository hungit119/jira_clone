import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.users.push(action.payload.user);
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
