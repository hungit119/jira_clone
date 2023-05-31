// Auth selector
export const isAuthenticateSelector = (state) => state.auth.isAuthenticated;
export const usernameSelector = (state) => state.auth.user.username;
export const userIdSelector = (state) => state.auth.user.id;
export const userAvatarSelector = (state) => state.auth.user.avatar;
export const userSelector = (state) => state.auth.user;
// Project selector
export const projectsSelector = (state) => state.project.projects;
export const projectSelector = (state) => state.project.project;
export const titleProjectSelector = (state) => state.project.project.title;
export const projectUserJoinedSelector = (state) =>
  state.project.project.users_joined;
export const currentProjectIdSelector = (state) => state.project.project.id;
// issue
export const issueSelector = (state) => state.issue.issue;
export const listIssuesSelector = (state) => state.issue.issues;
export const issuesFormatSelector = (state) => state.issue.issuesFormat;
export const issuesBacklogSelector = (state) =>
  state.issue.issues.filter((issue) => issue.status === "backlog");
export const issuesSelectedSelector = (state) =>
  state.issue.issues.filter((issue) => issue.status === "selected");
export const issuesProgressSelector = (state) =>
  state.issue.issues.filter((issue) => issue.status === "progress");
export const issuesDoneSelector = (state) =>
  state.issue.issues.filter((issue) => issue.status === "done");

export const modalShowSelector = (state) => state.issue.modalShow;
export const issueIdSelector = (state) => state.issue.issueId;
