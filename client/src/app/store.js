import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authSlice";
import projectReducer from "./reducers/project/projectSlice";
import issueReducer from "./reducers/issue/issueSlide";
import userReducer from "./reducers/user/userSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    issue: issueReducer,
    user: userReducer,
  },
});

export default store;
