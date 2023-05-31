import { createSlice } from "@reduxjs/toolkit";
export const issueSlice = createSlice({
  name: "issue",
  initialState: {
    issue: {},
    issues: [],
    issuesFormat: {},
    modalShow: false,
    issueId: "",
  },
  reducers: {
    setIssue: (state, action) => {
      state.issue = action.payload;
    },
    setListIssues: (state, action) => {
      state.issues = action.payload.issues;
    },
    setAddIssue: (state, action) => {
      state.issues.push(action.payload.issue);
    },
    setIssuesFormat: (state, action) => {
      state.issuesFormat = action.payload;
    },
    setModalShow: (state, action) => {
      state.modalShow = action.payload.show;
    },
    setIssueUpdate: (state, action) => {
      state.issues = state.issues.map((issue) =>
        issue.id === action.payload.id ? action.payload.issue : issue
      );
    },
    setDeleteIssue: (state, action) => {
      state.issues = state.issues.filter(
        (issue) => issue.id !== action.payload.issue.id
      );
    },
    setIssueId: (state, action) => {
      state.issueId = action.payload.id;
    },
  },
});
export const {
  setIssue,
  setListIssues,
  setIssuesFormat,
  setAddIssue,
  setModalShow,
  setIssueUpdate,
  setDeleteIssue,
  setIssueId,
} = issueSlice.actions;
export default issueSlice.reducer;
