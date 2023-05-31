import { createSlice } from "@reduxjs/toolkit";
export const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    project: {
      title: "",
      category: "",
      url: "",
      description: "",
      users_joined: [],
      issues_created: [],
    },
    userInfoJoined: [],
  },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload.projects;
    }, // => {type:'project/setProjects'}
    setProject: (state, action) => {
      state.project = action.payload.project;
    },
    setIssues: (state, action) => {
      state.issues = {
        ...state.issues,
        [action.payload.status]: action.payload.issues,
      };
    },
    setIssue: (state, action) => {
      state.project.issues_created.push(action.payload.issue);
    },
  },
});
export const { setProjects, setProject, setIssues, setIssue } =
  projectSlice.actions;
export default projectSlice.reducer;
