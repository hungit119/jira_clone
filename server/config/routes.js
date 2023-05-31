/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const jwt = require("jsonwebtoken");
module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/
  //Auth routes :
  "POST /api/auth/register": "UserController.register",
  "POST /api/auth/login": "UserController.login",
  "GET /api/auth/": "UserController.loadUser",
  "POST /api/auth/refreshToken": "UserController.refreshToken",
  "POST /api/users": "UserController.getUsers",
  "GET /api/allUsers": "UserController.getAllUsers",
  "POST /api/auth/google-login":"UserController.googleLogin",
  // generate dynamic page
  "POST /api/createUser": "UserController.createUser",
  "GET /api/findUsers": "UserController.getAllUsers",
  "DELETE /api/deleteUser": "UserController.deleteUser",
  "GET /api/findUser": "UserController.findUserFormDynamic",
  "PUT /api/updateUser": "UserController.updateUserFormDynamic",
  "POST /api/filterUsers": "UserController.filter",
  "POST /api/filterAdvanceUsers": "UserController.filterAdvance",

  // Project routes :
  "GET /api/project": "ProjectController.getProject",
  "GET /api/projects": "ProjectController.getProjects",
  "POST /api/project": "ProjectController.createProject",
  "DELETE /api/project": "ProjectController.deleteProject",
  "PUT /api/project": "ProjectController.updateProject",
  // generate dynamic page
  "POST /api/createProject": "ProjectController.createProjectFormDynamic",
  "GET /api/findProjects": "ProjectController.getAllProjects",
  "DELETE /api/deleteProject": "ProjectController.deleteProjecrFormDynamic",
  "GET /api/findProject": "ProjectController.getProjectFormDynamic",
  "PUT /api/updateProject": "ProjectController.updateProjectFormDynamic",
  "POST /api/filterProjects": "ProjectController.filter",
  "POST /api/filterAdvanceProjects": "ProjectController.filterAdvance",

  // Issue routes :
  "GET /api/issue": "IssueController.getIssue",
  "GET /api/issues": "IssueController.getIssues",
  "POST /api/issueCreate": "IssueController.createIssue",
  "DELETE /api/issue": "IssueController.deleteIssue",
  "PUT /api/issue": "IssueController.updateIssue",
  "PUT /api/issuePut": "IssueController.putIssue",
  "GET /api/issuesSearch": "IssueController.searchIssues",
  "POST /api/filterIssues": "IssueController.filterIssues",
  // generate dynamic page
  "POST /api/createIssue": "IssueController.createIssueFormDynamic",
  "GET /api/findIssues": "IssueController.getAllIssues",
  "DELETE /api/deleteIssue": "IssueController.deleteIssueFormDynamic",
  "GET /api/findIssue": "IssueController.findIssueFormDynamic",
  "PUT /api/updateIssue": "IssueController.updateIssueFormDynamic",
  // "POST /api/filterIssues": "IssueController.filter",
  "POST /api/filterAdvanceIssues": "IssueController.filterAdvance",

  // generate dynamic page
  "GET /api/findModalCategory": "CategoryController.getAll",
  "GET /api/findModalUsers": "UserController.getAll",
  "GET /api/findModalTypes": "TypeController.getAll",
  "GET /api/findModalStatus": "StatusController.getAll",
  "GET /api/findModalPriority": "PriorityController.getAll",
  "GET /api/findModalProjects": "ProjectController.getAll",
  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
